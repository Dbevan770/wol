import { View, Text } from 'react-native';

import type { HeaderTitleProps } from '@react-navigation/elements';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export type HeaderTitleElementProps = HeaderTitleProps & {
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
};

export const HeaderTitleElement = ({ ...props }: HeaderTitleElementProps) => {
  return (
    <View style={props.titleContainerStyle}>
      <Text style={props.titleTextStyle}>{props.children}</Text>
    </View>
  );
};
