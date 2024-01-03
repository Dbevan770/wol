import { ErrorBase } from '@/types';

type DeviceErrorName =
  | 'DEVICE_ADD_ERROR'
  | 'DEVICE_FETCH_ERROR'
  | 'DEVICE_FORGET_ERROR';

export class DeviceError extends ErrorBase<DeviceErrorName> {}
