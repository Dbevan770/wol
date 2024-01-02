import { View, Text, StyleSheet } from 'react-native';
import { DeviceDetailsButtons } from '@/features/devices/components';

import type { Device } from '@/types';

type DeviceDetailsProps = {
  device: Device;
  forgetDevice: (id: string) => void;
};

export const DeviceDetails = ({ device, forgetDevice }: DeviceDetailsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsTable}>
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Device MAC:</Text>
          <Text style={styles.detailText}>{device.mac}</Text>
        </View>
        <View style={styles.tableDivider} />
        <View style={styles.detailsRow}>
          <Text style={styles.detailLabel}>Device IP:</Text>
          <Text style={styles.detailText}>{device.ip || 'Undefined'}</Text>
        </View>
      </View>
      <DeviceDetailsButtons device={device} forgetDevice={forgetDevice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailsTable: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    gap: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(57, 62, 71, 0.5)',
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  detailText: {
    color: '#ffffff',
    fontFamily: 'Menlo',
  },
  tableDivider: {
    height: 1,
    borderWidth: 1,
    borderColor: 'rgba(57, 62, 71, 0.25)',
  },
});
