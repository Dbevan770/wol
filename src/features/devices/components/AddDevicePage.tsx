import { ScrollView, ActivityIndicator, View } from 'react-native';
import { AddDeviceForm } from '@/features/devices/components';
import { useAddDevice } from '@/hooks';

export const AddDevicePage = () => {
  const { isLoading } = useAddDevice();
  return (
    <ScrollView style={{ height: '100%', backgroundColor: '#111622' }}>
      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : null}
      <AddDeviceForm />
    </ScrollView>
  );
};
