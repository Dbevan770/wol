import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Flags } from '@/types';

type InitialState = Flags;

const initialState: InitialState = {
  isFirstLaunch: true,
};

const flagsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
  },
});

export const { setFirstLaunch } = flagsSlice.actions;

export default flagsSlice.reducer;
