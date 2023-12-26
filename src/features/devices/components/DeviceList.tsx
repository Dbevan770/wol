import { ScrollView } from 'react-native';
import { DeviceListItem } from './DeviceListItem';

import { Device } from '@/types';

type Props = {
  devices: Device[];
};

export const DeviceList = ({ devices }: Props) => {
  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: '#111622',
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}>
      {devices.map(device => (
        <DeviceListItem key={device.id} device={device} />
      ))}
    </ScrollView>
  );
};
