import { configureStore } from '@reduxjs/toolkit';

import deviceReducer from '@/slices/DevicesSlice/devicesSlice';
import flagsReducer from '@/slices/FlagsSlice/flagsSlice';

export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    flags: flagsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
