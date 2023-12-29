import { STATUSES } from './constants';

type Statuses = typeof STATUSES;

export type DeviceStatus = keyof Statuses;

export type NewDevice = {
  name: string;
  mac: string;
  ip?: string;
};

export type Device = NewDevice & {
  id: string;
  status: DeviceStatus;
  createdAt: Date;
  lastSeen?: Date;
};
