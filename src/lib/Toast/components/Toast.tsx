import { View, Text } from 'react-native';

import type { ToastProps } from '@/lib/Toast/types/toast';

export const Toast = (props: ToastProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        padding: 16,
      }}>
      <Text>{props.message || 'Where message???'}</Text>
    </View>
  );
};
