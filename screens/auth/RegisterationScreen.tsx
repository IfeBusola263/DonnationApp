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
import BackButton from '../../components/buttons/BackButton';
import {createUser} from '../../api/user';
import {useAppDispatch} from '../../hooks/storeHooks';
import {updateUser} from '../../store/slices/userSlice';

const initialData = {
  email: '',
  password: '',
  name: '',
};

export type RegisterationformProps = typeof initialData;
type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.register
>;

const RegisterationScreen = ({navigation}: ScreenProps) => {
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleFormInputs = (
    field: keyof RegisterationformProps,
    value: string,
  ) => {
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.name || !formData.name) {
      Alert.alert('Error', 'You need to fill all the fields');
      return;
    }

    setIsLoading(true);

    try {
      const user = await createUser(formData);

      if (!user.success) {
        throw new Error(user.error);
      }
      dispatch(updateUser({firstName: user.data?.user.displayName!}));
      Alert.alert('Registeration Successful!');
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
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
      <BackButton />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={styles.contentSpace}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header size="big" title="Hello and Welcome!" />
          <Input
            value={formData.name}
            label="First and Last name"
            onChangeText={(value: string) => handleFormInputs('name', value)}
            placeHolder="Please Enter your name..."
          />
          <Input
            value={formData.email}
            label="email"
            placeHolder="Enter your Email..."
            onChangeText={(value: string) => handleFormInputs('email', value)}
            keyboardType="email-address"
          />
          <Input
            value={formData.password}
            label="password"
            secureField
            onChangeText={value => handleFormInputs('password', value)}
            placeHolder="***********"
          />
          <PrimaryButton
            use="button"
            text={!isLoading ? 'Register' : 'Please wait...'}
            onPress={handleSubmit}
            isDisabled={isLoading}
          />
          <Text onPress={() => navigation.goBack()} style={styles.buttonLabel}>
            Already have an account? Login
          </Text>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterationScreen;

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
