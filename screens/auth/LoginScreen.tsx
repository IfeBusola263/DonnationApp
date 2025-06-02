import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getFontFamily,
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../utils/helpers';
import Input from '../../components/inputs/Input';
import {useState} from 'react';
import Header from '../../components/Header/Header';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import {type RootStackParamList} from '../../utils/types';
import {StackRoutes} from '../../navigation/routes';
import {useAppDispatch} from '../../hooks/storeHooks';
import {loginUser} from '../../api/user';
import {login} from '../../store/slices/userSlice';

const initialData = {
  email: '',
  password: '',
};

export type LoginProps = typeof initialData;
type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.login
>;

const LoginScreen = ({navigation}: ScreenProps) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleFormInputs = (field: keyof LoginProps, value: string) => {
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'You need to fill all the fields');
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginUser(formData);

      if (user.status === 'success') {
        dispatch(login(user.data));
        setTimeout(() => {
          navigation.navigate(StackRoutes.home);
        }, 1000);
        return;
      }
      throw new Error(user.message);
    } catch (error) {
      const err = error as {message: string};
      // console.log('Error', err?.message);
      Alert.alert('Error', err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={styles.contentSpace}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header size="big" title="Welcome Back" />
          <Input
            value={formData.email}
            label="email"
            placeHolder="Enter your Email..."
            onChangeText={(value: string) => handleFormInputs('email', value)}
            keyboardType="email-address"
            editable={isLoading}
          />
          <Input
            value={formData.password}
            label="password"
            secureField
            onChangeText={value => handleFormInputs('password', value)}
            placeHolder="*************"
            editable={isLoading}
          />
          <PrimaryButton
            use="button"
            text={isLoading ? 'Please wait...' : 'Login'}
            isDisabled={isLoading}
            onPress={handleSubmit}
          />
          <Text
            onPress={() => navigation.navigate(StackRoutes.register)}
            style={styles.buttonLabel}>
            Don't have an account
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    justifyContent: 'center',
  },
  contentSpace: {
    gap: 24,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonLabel: {
    textAlign: 'center',
    color: '#156CF7',
    fontSize: scaleFontSize(18),
    fontFamily: getFontFamily('Inter', '600'),
    // paddingVertical: verticalScale(10),
  },
});
