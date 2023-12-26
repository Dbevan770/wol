import type { StyleProp, ViewStyle } from 'react-native';
import type {
  NativeStackHeaderProps,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import type {
  HeaderLeftElementProps,
  HeaderTitleElementProps,
  HeaderRightElementProps,
} from '@/components/Navigation';

import { View } from 'react-native';

type StackHeaderOptions = NativeStackNavigationOptions & {
  headerLeft?: (props: HeaderLeftElementProps) => React.ReactNode;
  headerTitle?: string | ((props: HeaderTitleElementProps) => React.ReactNode);
  headerRight?: (props: HeaderRightElementProps) => React.ReactNode;
};

export type StackHeaderProps = Omit<NativeStackHeaderProps, 'options'> & {
  options: StackHeaderOptions;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const StackHeader = ({ ...props }: StackHeaderProps) => {
  const { navigation, options, route, back, children, style } = props;
  return <View style={style}>{children}</View>;
};
