import { View } from 'react-native';

import type { HeaderButtonProps } from '@react-navigation/elements';
import type { StyleProp, ViewStyle } from 'react-native';

export type HeaderRightElementProps = HeaderButtonProps & {
  onPress?: () => void;
  disabled?: boolean;
  label?: string;
  canGoBack: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const HeaderRightElement = ({ ...props }: HeaderRightElementProps) => {
  return <View style={props.style}>{props.children}</View>;
};
