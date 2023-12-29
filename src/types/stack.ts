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

export type StackParamList = RootStackParamList & ParamListBase;

export type Screens = RouteConfig<
  StackParamList,
  keyof StackParamList,
  StackNavigationState<StackParamList>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap
>;
