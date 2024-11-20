import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User State
interface UserState {
  data: Record<string, any>;
  isAuthenticated: boolean;
  loading: boolean;
}

// Initial state
const initialState: UserState = {
  data: {},
  isAuthenticated: false,
  loading: false,
};

// Create the User Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.data = {};
      state.isAuthenticated = false;
    },
  },
});

// Export actions and reducer
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
