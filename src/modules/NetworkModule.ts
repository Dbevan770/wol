import { NativeModules } from 'react-native';
type NetworkModuleType = {
  sendWakeOnLan(broadcastIP: string, targetMac: string): void;
};

const NetworkModule: NetworkModuleType = NativeModules.NetworkModule;

export { NetworkModule };
