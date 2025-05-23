import {ToastAndroid} from 'react-native';
import {type RegisterationformProps} from '../screens/auth/RegisterationScreen';
import Auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const createUser = async ({
  name,
  password,
  email,
}: RegisterationformProps) => {
  try {
    const user = await Auth().createUserWithEmailAndPassword(email, password);
    await user.user.updateProfile({displayName: name});
    console.log('User Data', user);
    return user;
  } catch (err) {
    const error = err as FirebaseAuthTypes.NativeFirebaseAuthError;
    if (error.code === 'auth/email-already-in-use') {
      ToastAndroid.showWithGravity(
        'That email address is already in use!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      ToastAndroid.showWithGravity(
        'That email address is invalid!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      console.log('That email address is invalid!');
    }

    console.error(error);
  }
};
