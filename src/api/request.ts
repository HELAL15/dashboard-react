
import axios from 'axios';
import { getToken, removeAllTokens } from '../helpers/Utils';
import { store } from '../redux/store';
import NProgress from 'nprogress';
import { setLoading } from '../redux/features/PageLoadingSlice';
import { removeUser } from '../redux/features/UserSlice';


// Initial language from localStorage or default to 'en'
const lang = localStorage.getItem("i18nextLng") || 'en';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const request = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'accept-language': lang,
    'Lang': lang,
  },
});

request.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    NProgress.start();
    try {
      const token = getToken("accessTokenAdmin");
      const lang = localStorage.getItem("i18nextLng");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (lang) {
        config.headers["Accept-Language"] = lang;
        config.headers["Lang"] = lang;
      }

      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    store.dispatch(setLoading(false));
    NProgress.done();
    return Promise.reject({
      message: "Error in request interceptor",
      error,
    });
  }
);


request.interceptors.response.use(
  (response) => {
    NProgress.done();
    store.dispatch(setLoading(false));
    return response
  },
  (error) => {
    store.dispatch(setLoading(false));
    NProgress.done();
    if (error.response?.status === 401) {
      
      store.dispatch(removeUser());
      removeAllTokens()
    }
    return Promise.reject(error);
  }
);



