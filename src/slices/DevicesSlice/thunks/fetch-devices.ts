import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Device } from '@/types';

import { getBucket } from '@/lib/AsyncStorage';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async () => {
    console.log('Running device fetch dispatch...');
    const response = await getBucket<Device[]>('devices');

    if (!response.success || response.data === null) {
      console.log(response.error?.message);
      return [];
    }

    const devices = Array.isArray(response.data)
      ? response.data
      : [response.data];

    return devices;
  },
);
