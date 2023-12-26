import {
  SafeAreaProvider as NativeSafeAreaProvider,
  SafeAreaView as NativeSafeAreaView,
} from 'react-native-safe-area-context';

type SafeAreaViewProps = {
  children: React.ReactNode;
};

export const SafeAreaProvider = (props: SafeAreaViewProps) => {
  return (
    <NativeSafeAreaProvider>
      <NativeSafeAreaView style={{ flex: 1, backgroundColor: '#111622' }}>
        {props.children}
      </NativeSafeAreaView>
    </NativeSafeAreaProvider>
  );
};
