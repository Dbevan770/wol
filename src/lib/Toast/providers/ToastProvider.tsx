import { View } from 'react-native';

import { ToastProviderProps } from '../types';

export const ToastProvider = (props: ToastProviderProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
      {props.children}
    </View>
  );
};
