import { HeaderTitleElement } from '@/components/Navigation';
import type { HeaderTitleElementProps } from '@/components/Navigation';
import type { StyleProp, TextStyle } from 'react-native';

type TitleProps = HeaderTitleElementProps & {
  titleTextStyle?: StyleProp<TextStyle>;
};

export const Title = ({ ...props }: TitleProps) => {
  return <HeaderTitleElement {...props}></HeaderTitleElement>;
};
