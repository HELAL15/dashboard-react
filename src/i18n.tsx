import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'], 
    debug: false,
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false,
    },
    
    backend: {
      loadPath: '/src/locales/{{lng}}/translation.json',
    },
    detection: {
      order: [ 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  axios.defaults.headers.common['Accept-Language'] = lng;
  axios.defaults.headers.common['lang'] = lng;
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng ;
});

export default i18n;
