import { StackParamList } from '@/types';
import type { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { useStackContext } from '@/hooks/useStackContext';

/* Creating a custom type for the Stack Navigator
 * that omits the initialRouteName prop which is
 * normally a primitive string. Instead I pass
 * in `keyof RootStackParamList` which will only allow
 * the initialRouteName to be one of the keys in the
 * RootStackParamList type. (i.e. 'Home' or 'Settings')
 */
type NavigatorProps = Omit<NativeStackNavigatorProps, 'initialRouteName'> & {
  initialRouteName: keyof StackParamList;
};

export const Navigator = ({ ...props }: NavigatorProps) => {
  const { Navigator: NativeNavigator } = useStackContext();

  return <NativeNavigator {...props}>{props.children}</NativeNavigator>;
};
