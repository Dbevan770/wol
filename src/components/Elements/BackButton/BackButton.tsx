import { HeaderLeftElement } from '@/components/Navigation';
import { Button } from '@/components/Elements';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { StyleProp, ViewStyle } from 'react-native';

import type { HeaderLeftElementProps } from '@/components/Navigation';

type BackButtonProps = HeaderLeftElementProps & {
  onPress?: () => void;
  iconColor?: string;
  iconSize?: number;
  canGoBack: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
};

export const BackButton = ({
  canGoBack = true,
  iconColor = '#ffffff',
  iconSize = 16,
  onPress,
  buttonStyle,
  ...props
}: BackButtonProps) => {
  return (
    <HeaderLeftElement canGoBack={canGoBack} {...props}>
      <Button
        style={buttonStyle}
        onPress={onPress}
        icon={faChevronLeft}
        iconColor={iconColor}
        iconSize={iconSize}
      />
    </HeaderLeftElement>
  );
};
