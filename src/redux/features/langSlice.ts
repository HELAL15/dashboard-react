import { createSlice } from "@reduxjs/toolkit";
import i18next from "i18next";




const initialState = {
  value: localStorage.getItem('i18nextLng') || 'ar',
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang: (state) => {
      const newLang = state.value === 'ar' ? 'en' : 'ar';
      state.value = newLang;
      i18next.changeLanguage(newLang).then(() => {
        window.document.dir = i18next.dir(newLang);
        window.document.documentElement.lang = newLang;
      });
    }
  },
});

export const { changeLang } = langSlice.actions

export default langSlice.reducer