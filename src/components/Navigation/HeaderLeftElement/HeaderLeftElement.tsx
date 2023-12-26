import type { HeaderBackButtonProps } from '@react-navigation/elements';
import { View } from 'react-native';

export type HeaderLeftElementProps = HeaderBackButtonProps & {
  canGoBack: boolean;
  children?: React.ReactNode;
};

export const HeaderLeftElement = ({ ...props }: HeaderLeftElementProps) => {
  return <View style={props.style}>{props.children}</View>;
};
