import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faDesktop,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { DeviceDetails } from '@/features/devices/components';
import { useDevicesContext } from '@/hooks/useDevicesContext';

import { Device } from '@/types';

type DeviceProps = {
  device: Device;
};

export const DeviceListItem = ({ device }: DeviceProps) => {
  const [expanded, setExpanded] = useState(false);
  const { isLoading } = useDevicesContext();

  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'online':
        return { status: 'Online', color: 'green' };
      case 'offline':
        return { status: 'Offline', color: 'red' };
      case 'unknown':
        return { status: 'Unknown', color: 'yellow' };
      default:
        return { status: 'Unknown', color: 'yellow' };
    }
  };

  const { status, color } = getStatusDetails(device.status);

  return (
    <View style={styles.deviceContainer}>
      {isLoading ? (
        <View style={styles.deviceLoadingCircleContainer}>
          <ActivityIndicator color="#00FF00" size="large" />
        </View>
      ) : null}
      <View style={styles.deviceContent}>
        <Pressable
          style={
            expanded
              ? deviceExpandedPressableContainer
              : styles.devicePressableContainer
          }
          onPress={() => setExpanded(!expanded)}>
          <View style={styles.deviceIconContainer}>
            <FontAwesomeIcon icon={faDesktop} size={24} color="#ffffff" />
          </View>
          <View style={styles.deviceHeaderContainer}>
            <Text style={styles.deviceHeader}>{device.name}</Text>
            <View style={styles.deviceSubHeaderContainer}>
              <Svg
                width="6"
                height="6"
                viewBox="0 0 100 100"
                style={{ marginTop: 4 }}>
                <Circle cx="50" cy="50" r="50" fill={color} />
              </Svg>
              <Text style={styles.deviceSubHeader}>
                {status} - Last Online: 12/19/2023 09:20:00
              </Text>
            </View>
          </View>
          <View style={styles.deviceButtonContainer}>
            <View style={styles.deviceButton}>
              <FontAwesomeIcon
                icon={expanded ? faChevronUp : faChevronDown}
                size={14}
                color="#ffffff"
              />
            </View>
          </View>
        </Pressable>
        {expanded ? <DeviceDetails device={device} /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceContainer: {
    borderWidth: 2,
    borderColor: '#393e47',
    borderRadius: 10,
    marginBottom: 18,
    backgroundColor: '#19212b',
  },
  deviceContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
  },
  devicePressableContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  deviceHeaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 24,
    gap: 4,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  deviceButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  deviceSubHeaderContainer: {
    flex: 1,
    marginLeft: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 8,
  },
  deviceHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  deviceSubHeader: {
    fontSize: 10,
    fontFamily: 'Menlo',
    color: 'hsl(0, 0%, 80%)',
    fontWeight: '400',
  },
  deviceButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: 'hsl(213, 26%, 20%)',
    borderWidth: 2,
    borderColor: '#393e47',
  },
  deviceLoadingCircleContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
});

const deviceExpandedPressableContainer = StyleSheet.compose(
  styles.devicePressableContainer,
  {
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(57, 62, 71, 0.5)',
    paddingBottom: 16,
  },
);
