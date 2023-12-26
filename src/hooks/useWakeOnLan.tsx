import { z } from 'zod';

import { NetworkModule } from '@/modules';
import { useDevicesContext } from '@/hooks';

const schema = z.object({
  ip: z.string().min(7).max(15).ip(),
  mac: z
    .string()
    .min(17)
    .max(17)
    .regex(/([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})/),
});

const BROADCAST_IP = '192.168.50.255' as const; // TODO: Remove hard-coded IP

export const useWakeOnLan = () => {
  const { selectedDevice } = useDevicesContext();
  const { sendWakeOnLan } = NetworkModule;

  const wakeOnLan = async () => {
    if (!selectedDevice) {
      console.error('No device selected');
      return;
    }

    console.log('Preparing to send WOL packet...');

    console.log(
      `Selected device: ${selectedDevice.name} (${selectedDevice.mac})`,
    );
    console.log(`Broadcast IP: ${BROADCAST_IP}`);

    const result = schema.safeParse({
      ip: BROADCAST_IP,
      mac: selectedDevice.mac,
    });

    if (!result.success) {
      console.error(result.error);
      return;
    }

    const { ip, mac } = result.data;

    console.log(
      `Constructing WOL packet with validated data: [BROADCAST_IP: ${ip}, MAC: ${mac}]}`,
    );

    sendWakeOnLan(ip, mac);
  };

  return { wakeOnLan };
};
