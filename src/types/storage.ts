import type { Devices } from '@/types/device';
import type { Flags } from '@/types/flags';
import type { AppSettings, UserSettings } from '@/types/settings';

import {
  DEVICES_DEFAULT,
  FLAGS_DEFAULT,
  APP_SETTINGS_DEFAULT,
  USER_SETTINGS_DEFAULT,
} from '@/types/constants';

export const DefaultValues: AppStorage = {
  devices: DEVICES_DEFAULT,
  flags: FLAGS_DEFAULT,
  settings: APP_SETTINGS_DEFAULT,
  userSettings: USER_SETTINGS_DEFAULT,
};

export type AppStorage = {
  devices: Devices;
  flags: Flags;
  settings: AppSettings;
  userSettings: UserSettings;
};
