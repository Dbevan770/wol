import { STATUSES, DEVICE, NEW_DEVICE } from './constants';

type Statuses = (typeof STATUSES)[keyof typeof STATUSES];
type NewDeviceDetails = (typeof NEW_DEVICE)[keyof typeof NEW_DEVICE];
type DeviceDetails = (typeof DEVICE)[keyof typeof DEVICE];

type NewDeviceTypes = {
  name: string;
  mac: string;
  ip?: string;
};

export type NewDevice = {
  [K in NewDeviceDetails]: NewDeviceTypes[K];
};

type DeviceTypes = NewDeviceTypes & {
  id: string;
  status: Statuses;
  createdAt: Date | string;
  lastSeen?: Date | string;
};

export type Device = {
  [K in DeviceDetails]: DeviceTypes[K];
};

export type Devices = {
  [id: string]: Device;
};
