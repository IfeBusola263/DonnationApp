import {
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

const initialData = {
  email: '',
  password: '',
};

type formProps = typeof initialData;
type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof StackRoutes.login
>;

const LoginScreen = ({navigation}: ScreenProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleFormInputs = (field: keyof formProps, value: string) => {
    console.log(value);
    setFormData(prevData => ({...prevData, [field]: value}));
  };

  console.log(formData.email);
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
          />
          <Input
            value={formData.password}
            label="password"
            secureField
            onChangeText={value => handleFormInputs('password', value)}
            placeHolder="*************"
          />
          <PrimaryButton use="button" text="Login" onPress={() => {}} />
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
