import {useAppSelector} from '../hooks/storeHooks';
import AuthNavigation from './auth_navigation/AuthNavigation';
import MainNavigation from './main_navigation/MainNavigation';

const RootNavigation = () => {
  const {isLoggedIn} = useAppSelector(state => state.user);
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
