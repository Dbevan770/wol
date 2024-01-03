import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchDevices, addDevice, forgetDevice } from '@/slices/DevicesSlice';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/stores';
import type { Device } from '@/types';

type InitialState = {
  storedDevices: Device[];
  selectedDevice: Device | null;
};

const initialState: InitialState = {
  storedDevices: [],
  selectedDevice: null,
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      fetchDevices.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.storedDevices = action.payload;
      },
    );

    // Add device cases
    builder.addCase(
      addDevice.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.storedDevices = action.payload;
      },
    );

    // Forget device cases
    builder.addCase(
      forgetDevice.fulfilled,
      (state, action: PayloadAction<Device[]>) => {
        state.storedDevices = action.payload;
      },
    );
  },
});

const selectDevicesState = (state: RootState) => state.devices;

export const selectStoredDevices = createSelector(
  selectDevicesState,
  devices => devices.storedDevices,
);
export const selectSelectedDevice = createSelector(
  selectDevicesState,
  devices => devices.selectedDevice,
);

export default devicesSlice.reducer;
