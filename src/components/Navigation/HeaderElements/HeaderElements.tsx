import type {
  HeaderLeftElementProps,
  HeaderTitleElementProps,
  HeaderRightElementProps,
} from '@/components/Navigation';
import { StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native';

import { View, Text } from 'react-native';

type HeaderElementsProps = {
  leftElement?: (props: HeaderLeftElementProps) => React.ReactNode;
  titleElement?: string | ((props: HeaderTitleElementProps) => React.ReactNode);
  rightElement?: (props: HeaderRightElementProps) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const HeaderElements = ({ ...props }: HeaderElementsProps) => {
  const { leftElement, titleElement, rightElement, style, titleStyle } = props;

  return (
    <View style={style}>
      <View style={headerElementsStyle.leftElementSafeArea}>
        {leftElement ? leftElement({ canGoBack: false }) : null}
      </View>
      <View style={headerElementsStyle.middleElementSafeArea}>
        {titleElement ? (
          typeof titleElement === 'string' ? (
            <Text style={titleStyle}>{titleElement}</Text>
          ) : (
            titleElement({ children: '' })
          )
        ) : null}
      </View>
      <View style={headerElementsStyle.rightElementSafeArea}>
        {rightElement ? rightElement({ canGoBack: false }) : null}
      </View>
    </View>
  );
};

const headerElementsStyle = StyleSheet.create({
  leftElementSafeArea: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleElementSafeArea: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightElementSafeArea: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
