import { NativeModules, NativeModule } from 'react-native';

const { RNEventEmitter } = NativeModules;

export default RNEventEmitter as NativeModule;
