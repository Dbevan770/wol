import { THEME_OPTIONS, APP_SETTINGS, USER_SETTINGS } from '@/types/constants';

// Shared types
export type Themes = typeof THEME_OPTIONS;
export type ThemeOptions = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS];

/* App settings are settings managed by the app itself.
 * These settings cannot be changed by the user and are
 * read only.
 */
type AppSettingKeys = (typeof APP_SETTINGS)[keyof typeof APP_SETTINGS];

type AppSettingsTypes = {
  themes: Themes;
};

export type AppSettings = {
  readonly [K in AppSettingKeys]: AppSettingsTypes[K];
};

/* User settings are settings managed by the user.
 * These settings can be changed by the user and are
 * read/write.
 */
type UserSettingKeys = (typeof USER_SETTINGS)[keyof typeof USER_SETTINGS];

type UserSettingsTypes = {
  theme: ThemeOptions;
  broadcastAddress: string;
  wakeOnLanPort: number;
};

export type UserSettings = {
  [K in UserSettingKeys]: UserSettingsTypes[K];
};
