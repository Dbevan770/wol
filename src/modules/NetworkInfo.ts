import { NativeModules } from 'react-native';
import type { NativeModule } from 'react-native';

type NetworkInfoType = NativeModule & {
  getNetworkingInfo(activeInterface: string): void;
};

const { NetworkInfo } = NativeModules;

export default NetworkInfo as NetworkInfoType;
