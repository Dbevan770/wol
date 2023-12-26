import { View, Pressable } from 'react-native';
import { SplitDropdown } from '@/components/Elements';
import { GridSvg } from '@/assets/GridSvg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useDevicesContext, useWakeOnLan } from '@/hooks';

import { Svg, Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

import { styles } from './styles';

export const PowerOn = () => {
  const { devices } = useDevicesContext();
  const { wakeOnLan } = useWakeOnLan();

  return (
    <View style={styles.body}>
      <SplitDropdown items={devices} iconColor="#ffffff" />
      <View style={styles.powerButtonContainer}>
        <Pressable style={styles.powerOnButton} onPress={wakeOnLan}>
          <GridSvg color="rgba(92,215,178,0.5)" />
          <Svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            style={{ position: 'absolute', top: 4, right: -4, zIndex: 2 }}>
            <Defs>
              <RadialGradient
                id="grad"
                cx="48"
                cy="48"
                r="48"
                fx="48"
                fy="48"
                gradientUnits="userSpaceOnUse">
                <Stop
                  offset="0.65"
                  stopColor="hsl(162, 61%, 44%)"
                  stopOpacity="0.1"
                />
                <Stop
                  offset="1"
                  stopColor="hsl(162, 61%, 28%)"
                  stopOpacity="0.8"
                />
              </RadialGradient>
            </Defs>
            <Circle cx="48" cy="48" r="48" fill="url(#grad)" />
          </Svg>
          <FontAwesomeIcon
            icon={faPowerOff}
            size={72}
            color="#ffffff"
            style={{ zIndex: 2 }}
          />
        </Pressable>
      </View>
      <View></View>
    </View>
  );
};
