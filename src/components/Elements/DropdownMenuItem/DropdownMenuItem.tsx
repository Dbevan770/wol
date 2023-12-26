import { Pressable, Text, StyleSheet } from 'react-native';
import { useDevicesContext } from '@/hooks';

import type { Device } from '@/types';

type DropdownMenuItemProps = {
  device: Device;
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropdownMenuItem = ({
  device,
  closeMenu,
}: DropdownMenuItemProps) => {
  const { selectedDevice, setSelectedDevice } = useDevicesContext();
  const isSelectedItem = selectedDevice?.id === device.id;

  const handleChangeSelection = () => {
    if (selectedDevice?.id === device.id) {
      closeMenu(false);
    }

    setSelectedDevice(device);
    closeMenu(false);
  };

  return (
    <Pressable
      style={isSelectedItem ? selectedItemContainerStyle : styles.itemContainer}
      onPress={handleChangeSelection}>
      <Text style={isSelectedItem ? selectedItemTextStyle : styles.itemText}>
        {device.name}
      </Text>
      <Text style={isSelectedItem ? selectedItemMacTextStyle : macText}>
        {device.mac}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

const macText = StyleSheet.compose(styles.itemText, {
  fontSize: 12,
  fontFamily: 'Menlo',
});

const selectedItemContainerStyle = StyleSheet.compose(styles.itemContainer, {
  backgroundColor: '#3937e7',
});

const selectedItemTextStyle = StyleSheet.compose(styles.itemText, {
  fontWeight: 'bold',
});

const selectedItemMacTextStyle = StyleSheet.compose(macText, {
  fontWeight: 'bold',
});
