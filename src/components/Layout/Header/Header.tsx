import { StackHeader, HeaderElements } from '@/components/Navigation';

import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { styles } from './styles';

export const Header = (props: NativeStackHeaderProps) => {
  return (
    <StackHeader style={styles.container} {...props}>
      <HeaderElements
        style={styles.header}
        leftElement={props.options.headerLeft}
        titleElement={props.options.headerTitle}
        rightElement={props.options.headerRight}
      />
    </StackHeader>
  );
};
