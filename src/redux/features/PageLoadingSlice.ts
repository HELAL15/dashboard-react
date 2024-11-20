

import { createSlice } from '@reduxjs/toolkit';

// Define the User State
interface LoadingState {
  loading: boolean;
}

// Initial state
const initialState: LoadingState = {
  loading: false,
};

// Create the User Slice
const PageLoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Export actions and reducer
export const { setLoading } = PageLoadingSlice.actions;
export default PageLoadingSlice.reducer;
