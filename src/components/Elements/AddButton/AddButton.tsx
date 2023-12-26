import { HeaderRightElement } from '@/components/Navigation';
import { Button } from '@/components/Elements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import type { HeaderRightElementProps } from '@/components/Navigation';
import type { StyleProp, ViewStyle } from 'react-native';

type AddButtonProps = HeaderRightElementProps & {
  onPress?: () => void;
  iconColor?: string;
  iconSize?: number;
  canGoBack: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
};

export const AddButton = ({
  canGoBack = false,
  iconColor = '#ffffff',
  iconSize = 16,
  onPress,
  buttonStyle,
  ...props
}: AddButtonProps) => {
  return (
    <HeaderRightElement canGoBack={canGoBack} {...props}>
      <Button
        style={buttonStyle}
        onPress={onPress}
        icon={faPlus}
        iconColor={iconColor}
        iconSize={iconSize}
      />
    </HeaderRightElement>
  );
};
