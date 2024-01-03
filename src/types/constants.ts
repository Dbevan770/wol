// Available themes
export const THEME_OPTIONS = {
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
  MIDNIGHT: 'midnight',
} as const;

// New device details, these differ in that it is information
// provided by the user. The full scope of a device is defined
// by the app after new device details are provided.
export const NEW_DEVICE = {
  NAME: 'name',
  MAC: 'mac',
  IP: 'ip',
} as const;

// Device details
export const DEVICE = {
  ID: 'id',
  NAME: 'name',
  MAC: 'mac',
  IP: 'ip',
  STATUS: 'status',
  CREATED_AT: 'createdAt',
  LAST_SEEN: 'lastSeen',
} as const;

// Available flags
export const FLAGS = {
  IS_FIRST_LAUNCH: 'isFirstLaunch',
} as const;

// Available app settings
export const APP_SETTINGS = {
  THEMES: 'themes',
} as const;

// Available user settings
export const USER_SETTINGS = {
  THEME: 'theme',
  BROADCAST_ADDRESS: 'broadcastAddress',
  WAKE_ON_LAN_PORT: 'wakeOnLanPort',
} as const;

export const DEVICES_DEFAULT = {} as const;

export const FLAGS_DEFAULT = {
  isFirstLaunch: false,
} as const;

export const APP_SETTINGS_DEFAULT = {
  themes: THEME_OPTIONS,
} as const;

export const USER_SETTINGS_DEFAULT = {
  theme: THEME_OPTIONS.SYSTEM,
  broadcastAddress: '',
  wakeOnLanPort: 9,
} as const;

export const STATUSES = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  UNKNOWN: 'unknown',
} as const;
