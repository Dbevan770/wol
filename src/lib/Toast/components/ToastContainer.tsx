import { useEffect } from 'react';
import { View } from 'react-native';
import { Toast } from '@/lib/Toast/components';

import { useToast } from '@/lib/Toast/hooks';

export const ToastContainer = () => {
  const { toasts, showToast } = useToast();

  // useEffect(() => {
  //   showToast('I AM TOAST!', {
  //     position: 'TOP_RIGHT',
  //   });
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      pointerEvents="box-none">
      {/* {toasts.length > 0
        ? toasts.map((toastData, i) => <Toast key={i} {...toastData} />)
        : null} */}
    </View>
  );
};
