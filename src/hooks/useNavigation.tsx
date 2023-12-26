import { useNavigation as useReactNavigation } from '@react-navigation/native';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { StackParamList } from '@/types';

export const useNavigation = <TScreen extends keyof StackParamList>() => {
  const navigation =
    useReactNavigation<NativeStackNavigationProp<StackParamList, TScreen>>();
  return navigation;
};
