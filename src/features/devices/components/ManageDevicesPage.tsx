import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { DeviceList } from './DeviceList';
import { selectStoredDevices } from '@/slices/DevicesSlice';
import { useAppSelector } from '@/stores';

export const ManageDevicesPage = () => {
  const selectDevices = useMemo(() => selectStoredDevices, []);
  const devices = useAppSelector(selectDevices);

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
          <Text style={{ color: '#ffffff', fontSize: 24 }}>
            No Devices Found!
          </Text>
        </View>
      )}
    </>
  );
};
