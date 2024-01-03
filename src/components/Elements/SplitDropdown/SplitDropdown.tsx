import { useState, useMemo } from 'react';
import { View, Pressable, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faComputer } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenu } from '@/components/Elements';
import {
  selectSelectedDevice,
  selectStoredDevices,
} from '@/slices/DevicesSlice';
import { useAppSelector } from '@/stores';

import type { Device } from '@/types';

import { styles } from './styles';

type SplitDropdownProps = {
  items: Device[];
  iconSize?: number;
  iconColor?: string;
};

export const SplitDropdown = ({
  iconSize = 16,
  iconColor = '#000',
}: SplitDropdownProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const selectDevices = useMemo(() => selectStoredDevices, []);
  const devices = useAppSelector(selectDevices);
  const selectSelectedDeviceMemo = useMemo(() => selectSelectedDevice, []);
  const selectedDevice = useAppSelector(selectSelectedDeviceMemo);

  return (
    <View style={styles.container}>
      <View style={styles.deviceContainer}>
        <FontAwesomeIcon
          icon={faComputer}
          size={28}
          color="rgba(255,255,255,0.8)"
        />
        <View style={styles.textContainer}>
          {selectedDevice ? (
            <>
              <Text style={styles.text}>{selectedDevice.name}</Text>
              <Text style={styles.subText}>{selectedDevice.mac}</Text>
            </>
          ) : (
            <Text style={styles.text}>No devices found</Text>
          )}
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => setShowMenu(!showMenu)}>
        <FontAwesomeIcon
          icon={faChevronDown}
          size={iconSize}
          color={iconColor}
        />
      </Pressable>
      {showMenu ? (
        <DropdownMenu devices={devices} closeMenu={setShowMenu} />
      ) : null}
    </View>
  );
};
