import { NativeModules } from 'react-native';
import type { NativeModule } from 'react-native';

type PathMonitorType = NativeModule & {
  startPathMonitor(): void;
  getNetworkingInfo(activeInterface: string): void;
};

export const PathMonitor: PathMonitorType = NativeModules.NetworkInfo;
