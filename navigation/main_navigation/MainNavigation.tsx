import {createStackNavigator} from '@react-navigation/stack';
import {StackRoutes} from '../routes';
import Home from '../../screens/home/Home';
import {RootStackParamList} from '../../utils/types';
import DonationDetailsScreen from '../../screens/donations/DonationDetailsScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterationScreen from '../../screens/auth/RegisterationScreen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={StackRoutes.login}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={StackRoutes.home} component={Home} />
      <Stack.Screen
        name={StackRoutes.donation}
        component={DonationDetailsScreen}
      />
      <Stack.Screen name={StackRoutes.login} component={LoginScreen} />
      <Stack.Screen
        name={StackRoutes.register}
        component={RegisterationScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
