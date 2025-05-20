import {createStackNavigator} from '@react-navigation/stack';
import {StackRoutes} from '../routes';
import Home from '../../screens/home/Home';
import {RootStackParamList} from '../../utils/types';
import DonationDetailsScreen from '../../screens/donations/DonationDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={StackRoutes.home} component={Home} />
      <Stack.Screen
        name={StackRoutes.donation}
        component={DonationDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
