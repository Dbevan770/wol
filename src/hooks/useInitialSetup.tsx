import { getBucket, setBucketData } from '@/lib/AsyncStorage';

import type { Flags, Device } from '@/types';

export const useInitialSetup = () => {
  const checkIfFirstLaunch = async () => {
    const response = await getBucket<Flags>('flags');

    if ('error' in response && response.error?.code === 404) {
      await initialSetup();
      return;
    }

    if (!response.success || !response.data) {
      await initialSetup();
      return;
    }

    const flags = response.data;

    if (flags.isFirstLaunch) {
      await initialSetup();
      return;
    }
  };

  const initialSetup = async () => {
    // Set flags
    const flags: Flags = {
      isFirstLaunch: false,
    };
    console.log('Setting flags');
    await setBucketData('flags', flags);

    // Set devices
    const devices: Device[] = [];

    console.log('Setting devices');
    await setBucketData('devices', devices);

    console.log('Initial setup complete');
  };

  return {
    checkIfFirstLaunch,
  };
};
