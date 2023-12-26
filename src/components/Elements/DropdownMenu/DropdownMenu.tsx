import { ScrollView, StyleSheet } from 'react-native';
import { DropdownMenuItem } from '@/components/Elements';

import type { Device } from '@/types';

type DropdownMenuProps = {
  devices: Device[];
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropdownMenu = ({ devices, closeMenu }: DropdownMenuProps) => {
  return (
    <ScrollView style={styles.container}>
      {devices.map(device => (
        <DropdownMenuItem
          key={device.id}
          device={device}
          closeMenu={closeMenu}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: 4,
    backgroundColor: '#19212b',
    borderWidth: 2,
    borderColor: '#393e47',
    borderRadius: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
