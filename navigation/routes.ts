import {RootStackParamList} from '../utils/types';

type RouteKeys = {
  home: string;
  donation: string;
  login: string;
  register: string;
  payment: string;
};

export const StackRoutes: Record<keyof RouteKeys, keyof RootStackParamList> = {
  home: 'Home',
  donation: 'DonationDetails',
  login: 'Login',
  register: 'Register',
  payment: 'Payment',
} as const;
