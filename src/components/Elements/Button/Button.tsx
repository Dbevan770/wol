import { Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

import type { StyleProp, ViewStyle } from 'react-native';

type ButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: IconProp;
  iconSize?: number;
  iconColor?: string;
};

export const Button = ({
  onPress,
  style,
  icon,
  iconSize = 16,
  iconColor = '#ffffff',
}: ButtonProps) => {
  return (
    <Pressable style={style} onPress={onPress} hitSlop={20}>
      {icon ? (
        <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} />
      ) : null}
    </Pressable>
  );
};
