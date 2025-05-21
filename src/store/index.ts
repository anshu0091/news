import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './slices/newsSlice';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;