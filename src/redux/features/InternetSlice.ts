import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  value: 'online',
}

export const InternetSlice = createSlice({
  name: 'internetConnection',
  initialState,
  reducers: {
    handleStatusChange : (state) => {
      state.value = navigator.onLine ? 'online' : 'offline';
    }
  },
});

export const { handleStatusChange } = InternetSlice.actions

export default InternetSlice.reducer