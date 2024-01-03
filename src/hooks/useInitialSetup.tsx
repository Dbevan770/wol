import type { AppStorage } from '@/types';
import { DefaultValues } from '@/types';

import { useAsyncStorage } from '@/lib/AsyncStorage';

export const useInitialSetup = () => {
  const { createBucket, readBucket } = useAsyncStorage<AppStorage>();
  const checkIfFirstLaunch = async () => {
    try {
      const flags = await readBucket('flags');

      if (!flags) {
        throw new Error('Flags bucket was not found, running initial setup...');
      }

      if (flags.isFirstLaunch) {
        console.log("This is user's first launch, running initial setup...");
        await initialSetup();
      }

      console.log("This is not user's first launch, skipping initial setup...");
      return;
    } catch (error) {
      console.error(error);
      await initialSetup();
    }
  };

  const initialSetup = async () => {
    console.log('Creating flags bucket and storing initial keys...');
    const flagsBucketCreated = await createBucket('flags', DefaultValues.flags);

    // Flags bucket failing to create may potentially
    // cause issues down the line. It would create an
    // endless cycle of initial setups on launch. However,
    // I don't want to throw an error here because it would
    // prevent the app from launching.
    if (!flagsBucketCreated) {
      console.error('Failed to create flags bucket...');
    }

    console.log('Creating settings bucket and storing initial keys...');
    const settingsBucketCreated = await createBucket(
      'settings',
      DefaultValues.settings,
    );

    if (!settingsBucketCreated) {
      console.error('Failed to create settings bucket...');
    }

    console.log('Creating devices bucket and storing initial keys...');
    const devicesBucketCreated = await createBucket(
      'devices',
      DefaultValues.devices,
    );

    if (!devicesBucketCreated) {
      console.error('Failed to create devices bucket...');
    }

    console.log('Creating userSettings bucket and storing initial keys...');

    const userSettingsBucketCreated = await createBucket(
      'userSettings',
      DefaultValues.userSettings,
    );

    if (!userSettingsBucketCreated) {
      console.error('Failed to create userSettings bucket...');
    }

    console.log('Finished initial setup...');
    return;
  };

  return {
    checkIfFirstLaunch,
  };
};
