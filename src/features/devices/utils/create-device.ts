import type { NewDevice, Device, DeviceStatus } from '@/types';

import { generateUuid } from '@/lib/GenerateUUID';

export const createDevice = (newDevice: NewDevice): Device => {
  const { name, mac, ip } = newDevice;

  const id = generateUuid();

  const createdAt = new Date().toISOString();

  const status: DeviceStatus = 'UNKNOWN';

  return {
    id,
    name,
    mac,
    ip,
    createdAt,
    status,
  };
};
