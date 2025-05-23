import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DonationInfo} from '../store/slices/donationSlice';

export type RootStackParamList = {
  Home: undefined;
  DonationDetails: DonationInfo & {category: string};
  Login: undefined;
  Register: undefined;
};

// prop type for the screens in the main navigation
export type MainNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

//   Type for the Route
export type StackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
