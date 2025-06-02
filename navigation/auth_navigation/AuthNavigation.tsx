import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterationScreen from '../../screens/auth/RegisterationScreen';
import {StackRoutes} from '../routes';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={StackRoutes.login} component={LoginScreen} />
      <Stack.Screen
        name={StackRoutes.register}
        component={RegisterationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
