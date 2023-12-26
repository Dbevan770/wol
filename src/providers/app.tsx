import * as React from 'react';
import { SafeAreaProvider } from '@/lib/SafeAreaView';
import { StackProvider } from '@/lib/stack-navigator';
import { DevicesProvider } from '@/stores';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({
  children,
}: AppProviderProps): React.JSX.Element => {
  return (
    <SafeAreaProvider>
      <StackProvider>
        <DevicesProvider>{children}</DevicesProvider>
      </StackProvider>
    </SafeAreaProvider>
  );
};
