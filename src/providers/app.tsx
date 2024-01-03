import * as React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from '@/lib/SafeAreaView';
import { StackProvider } from '@/lib/stack-navigator';
import { ToastProvider } from '@/lib/Toast';
import { store } from '@/stores';

import { InitialLoad } from '@/features/initialLoad';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StackProvider>{children}</StackProvider>
        <ToastProvider />
      </SafeAreaProvider>
      <InitialLoad />
    </Provider>
  );
};
