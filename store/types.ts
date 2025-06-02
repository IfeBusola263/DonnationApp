// import {ImageSourcePropType} from 'react-native';

export type userProps = {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  token: string | null;
  //   avatar: ImageSourcePropType;
  avatar: string;
  isLoggedIn: boolean;
};
