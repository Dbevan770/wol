import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type FormProps = {
  children: React.ReactNode;
  onSubmit?: (data: any) => any;
  style?: StyleProp<ViewStyle>;
};

export const Form = (props: FormProps) => {
  return <View style={props.style}>{props.children}</View>;
};
