import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBucket, setBucketData } from '@/lib/AsyncStorage';

import { DeviceError } from '@/slices/DevicesSlice';

import type { Device } from '@/types';

export const addDevice = createAsyncThunk(
  'devices/addDevice',
  async (device: Device, { rejectWithValue }) => {
    try {
      console.log('Running device add dispatch...');

      const response = await getBucket<Device[]>('devices');

      if (!response.success) {
        switch (response.error!.code) {
          case 404:
            console.log(
              `'devices' bucket not found. Creating and adding device...`,
            );
            await setBucketData('devices', device);
            return [device];
          default:
            throw new DeviceError({
              name: 'DEVICE_ADD_ERROR',
              message: response.error!.message,
            });
        }
      }

      if (response.data === null) {
        console.log(`'devices' bucket exists but is empty. Adding device...`);
        await setBucketData('devices', device);
        return [device];
      }

      console.log(
        `'devices' bucket exists and is not empty. Appending device to current bucket...`,
      );

      const prevDevices = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const newDevices = [...prevDevices, device];

      await setBucketData('devices', newDevices);
      return newDevices;
    } catch (error) {
      if (error instanceof DeviceError) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        'An error occurred while adding the device. Please try again later.',
      );
    }
  },
);
