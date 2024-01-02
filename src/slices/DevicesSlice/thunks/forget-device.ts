import { createAsyncThunk } from '@reduxjs/toolkit';

import { getBucket, setBucketData } from '@/lib/AsyncStorage';

import type { Device } from '@/types';
import { DeviceError } from '@/slices/DevicesSlice';

export const forgetDevice = createAsyncThunk(
  'devices/forgetDevice',
  async (deviceId: string) => {
    const response = await getBucket<Device[]>('devices');

    if (response.error) {
      throw new DeviceError({
        name: 'DEVICE_FORGET_ERROR',
        message: response.error.message,
      });
    }

    if (!response.success && !response.data) {
      throw new DeviceError({
        name: 'DEVICE_FORGET_ERROR',
        message: 'No devices found',
      });
    }

    const devices = response.data
      ? Array.isArray(response.data)
        ? response.data
        : [response.data]
      : [];

    const filteredDevices = devices.filter(device => device.id !== deviceId);

    const setResponse = await setBucketData('devices', filteredDevices);

    if (setResponse.error) {
      throw new DeviceError({
        name: 'DEVICE_FORGET_ERROR',
        message: setResponse.error.message,
      });
    }

    return filteredDevices;
  },
);
