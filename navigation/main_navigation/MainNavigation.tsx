import {createStackNavigator} from '@react-navigation/stack';
import {StackRoutes} from '../routes';
import Home from '../../screens/home/Home';
import {RootStackParamList} from '../../utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={StackRoutes.home} component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
