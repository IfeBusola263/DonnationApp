import {LoginProps} from '../screens/auth/LoginScreen';
import {type RegisterationformProps} from '../screens/auth/RegisterationScreen';
import {getAuth, type FirebaseAuthTypes} from '@react-native-firebase/auth';
import {store} from '../store/store';
import {updateUser} from '../store/slices/userSlice';
import {Alert} from 'react-native';

type CreateUserResult =
  | {success: true; data: FirebaseAuthTypes.UserCredential}
  | {success: false; error: string};

type LoginUserResult =
  | {
      status: 'success';
      data: {token: string; displayName: string | null; email: string};
    }
  | {status: 'failed'; message: string};

export const createUser = async ({
  name,
  password,
  email,
}: RegisterationformProps): Promise<CreateUserResult> => {
  try {
    const user = await getAuth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await user.user.updateProfile({displayName: name});
    // console.log('User Data', user);
    return {data: user, success: true};
  } catch (err) {
    const error = err as FirebaseAuthTypes.NativeFirebaseAuthError;
    if (error.code === 'auth/email-already-in-use') {
      return {success: false, error: `${email} is already in use!`};
    }

    if (error.code === 'auth/invalid-email') {
      return {success: false, error: 'You have an Invalid Email address!'};
    }
    if (error.code === 'auth/network-request-failed') {
      return {success: false, error: 'Please check your network'};
    }

    return {success: false, error: 'Something went wrong!'};
  }
};

export const loginUser = async ({
  email,
  password,
}: LoginProps): Promise<LoginUserResult> => {
  try {
    const response = await getAuth().signInWithEmailAndPassword(
      email,
      password,
    );
    const token = await response.user.getIdToken();
    return {
      status: 'success',
      data: {
        token,
        displayName: response.user.displayName,
        email: response.user.email!,
      },
    };
  } catch (error) {
    const err = error as FirebaseAuthTypes.NativeFirebaseAuthError;

    if (err.code === 'auth/invalid-credential') {
      return {status: 'failed', message: 'Invalid Email/Password'};
    }

    return {status: 'failed', message: 'Something went wrong!'};
  }
};

export const logout = () => {
  getAuth().signOut();
};

export const refreshUserToken = async () => {
  try {
    const res = await getAuth().currentUser?.getIdToken(true);
    store.dispatch(updateUser({token: res}));
    console.log('Token has been refreshed');
  } catch (err) {
    const error = err as FirebaseAuthTypes.NativeFirebaseAuthError;
    // if (error.code === 'au')
    Alert.alert('error', error.message);
  }
};
