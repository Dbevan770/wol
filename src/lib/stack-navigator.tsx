import { createContext } from 'react';
import { StackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type StackContextType = ReturnType<
  typeof createNativeStackNavigator<StackParamList>
>;

export const StackContext = createContext<StackContextType | null>(null);

type StackProviderProps = {
  children: React.ReactNode;
};

export const StackProvider = ({ children }: StackProviderProps) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <StackContext.Provider value={Stack}>{children}</StackContext.Provider>
    </NavigationContainer>
  );
};
