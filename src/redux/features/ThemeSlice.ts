import { createSlice } from "@reduxjs/toolkit";




const initialState = {
  value: localStorage.getItem('theme') || 'light',
}

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === 'light' ? 'dark' : 'light';
      state.value = newTheme;

      const root = document.documentElement;
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      localStorage.setItem('theme', newTheme);
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions

export default ThemeSlice.reducer