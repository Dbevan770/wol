import { StyleSheet } from 'react-native';

export const addDeviceStyles = StyleSheet.create({
  addDeviceContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  addDeviceFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  deviceListContainer: {
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
});

export const manageDevicesStyles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111622',
  },
});

export const deviceListStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
    paddingHorizontal: 14,
    paddingVertical: 24,
  },
});
