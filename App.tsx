import './gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './navigation/RootNavigation';
import {AppState, AppStateStatus} from 'react-native';
import {refreshUserToken} from './api/user';

function App(): React.JSX.Element {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener(
      'change',
      async (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // Returned from background and token should be refreshed
          await refreshUserToken();
          console.log('Back from background and token refreshed');
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
