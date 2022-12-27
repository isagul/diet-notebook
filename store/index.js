import { configureStore } from '@reduxjs/toolkit';

import dietListReducer from './slices/dietListSlice';

export const store = configureStore({
  reducer: {
    dietList: dietListReducer,
  },
});