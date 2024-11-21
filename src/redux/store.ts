
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import Cookies from 'js-cookie'
import PageLoadingSlice from './features/PageLoadingSlice';
import SettingSlice from './features/SettingSlice';
import UserSlice from './features/UserSlice';


// Combine Reducers
const rootReducer = combineReducers({ 
  user: UserSlice,
  loading: PageLoadingSlice,
  setting: SettingSlice
});
const customCookieStorage = {
  getItem: (key: string) => {
    return Promise.resolve(Cookies.get(key) || null);  // Use js-cookie's get method
  },
  setItem: (key: string, value: string) => {
    Cookies.set(key, value,{
      secure: true, 
      sameSite: 'strict',
    });  // Use js-cookie's set method
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    Cookies.remove(key);  // Use js-cookie's remove method
    return Promise.resolve();
  }
};
// Persist Configuration
const persistConfig = {
  key: 'root',
  storage:customCookieStorage,
  whitelist: ['user'],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
