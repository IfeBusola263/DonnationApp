import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
};

// prop type for the screens in the main navigation
export type MainNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

//   Type for the Route
export type StackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
