import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastContainer } from '@/lib/Toast/components';
import { ToastContext } from '@/lib/Toast/context';

import type { ToastProps, ToastOptions } from '../types/toast';

import type { ToastProviderProps } from '@/lib/Toast/types';

export const ToastProvider = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (msg: string, options?: Partial<ToastOptions>) => {
    const newToast = { message: msg, ...options } as ToastProps;
    setToasts(prev => [...prev, newToast]);
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      <SafeAreaView
        style={{
          position: 'absolute',
          zIndex: 9999,
          flex: 1,
          width: '100%',
          height: '100%',
        }}
        pointerEvents="box-none">
        <View style={{ flex: 1 }} pointerEvents="box-none">
          <ToastContainer />
        </View>
      </SafeAreaView>
    </ToastContext.Provider>
  );
};
