import { STATUSES } from './constants';

import type {
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
} from '@react-navigation/native-stack';
import type {
  RouteConfig,
  StackNavigationState,
  ParamListBase,
} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  ManageDevices: undefined;
  AddDevice: undefined;
};

type Statuses = typeof STATUSES;

export type DeviceStatus = keyof Statuses;

export type StackParamList = RootStackParamList & ParamListBase;

export type Screens = RouteConfig<
  StackParamList,
  keyof StackParamList,
  StackNavigationState<StackParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;

export type NewDevice = {
  name: string;
  mac: string;
  ip?: string;
};

export type Device = NewDevice & {
  id: string;
  status: DeviceStatus;
  createdAt: Date;
  lastSeen?: Date;
};

export type APIResponse = {
  status: number;
  data: unknown;
  msg?: string;
};
