import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../api/request';

// Define the Setting State
interface SettingState {
  setting: Record<string, any>; // or better yet, define the actual structure of your settings
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SettingState = {
  setting: {},
  loading: false,
  error: null,
};

// Function to fetch settings
const fetchSettings = async () => {
  try {
    const response = await request.get('setting'); // Replace 'setting' with the correct endpoint
    return response.data; // Assuming the response contains the settings data
  } catch (error:any) {
    throw new Error(error.message || 'Failed to fetch settings');
  }
};

// Async thunk to fetch settings
export const fetchSettingsAsync = createAsyncThunk(
  'setting/fetchSettings',
  async () => {
    const response = await fetchSettings();
    return response;
  }
);

// Create the Setting Slice
const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettingsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingsAsync.fulfilled, (state, action) => {
        state.setting = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSettingsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      });
  },
});

// Export actions and reducer
export const { setSetting } = SettingSlice.actions;
export default SettingSlice.reducer;
