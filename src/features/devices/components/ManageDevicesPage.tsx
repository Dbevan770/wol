import { View, Text } from 'react-native';
import { DeviceList } from './DeviceList';
import { useDevicesContext } from '@/hooks/useDevicesContext';

export const ManageDevicesPage = () => {
  const { devices } = useDevicesContext();

  return (
    <>
      {devices.length > 0 ? (
        <DeviceList devices={devices} />
      ) : (
        <View
          style={{
            backgroundColor: '#111622',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: '#ffffff' }}>No Devices Found!</Text>
        </View>
      )}
    </>
  );
};
