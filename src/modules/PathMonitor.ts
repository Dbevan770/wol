import { NativeModules } from 'react-native';
import type { NativeModule } from 'react-native';

type PathMonitorType = NativeModule & {
  initPathMonitor(): void;
};

export const PathMonitor: PathMonitorType = NativeModules.NetworkInfo;
