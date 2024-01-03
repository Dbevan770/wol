import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ActionSheetIOS,
} from 'react-native';

import type { Device } from '@/types';

type DeviceDetailsButtonsProps = {
  device: Device;
  forgetDevice: (id: string) => void;
};

export const DeviceDetailsButtons = ({
  device,
  forgetDevice,
}: DeviceDetailsButtonsProps) => {
  const onPress = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Forget'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        title: `Really Forget '${device.name}'?`,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel Action
          return;
        } else if (buttonIndex === 1) {
          // Forget Device Action
          forgetDevice(device.id);
        } else {
          // Default Action
          return;
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={edit}>Edit Device</Text>
      </Pressable>
      <View style={styles.buttonDivider} />
      <Pressable
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Text style={forget}>Forget Device</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  edit: {
    color: '#ffffff',
  },
  forget: {
    color: '#ff0000',
  },
  buttonDivider: {
    height: 1,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(57, 62, 71, 0.25)',
  },
});

const text = StyleSheet.create({
  styles: {
    fontWeight: '500',
    fontSize: 16,
  },
});

const edit = StyleSheet.compose(styles.edit, text.styles);
const forget = StyleSheet.compose(styles.forget, text.styles);
