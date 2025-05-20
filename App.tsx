import {NavigationContainer} from '@react-navigation/native';
import './gesture-handler';
import React from 'react';
import MainNavigation from './navigation/main_navigation/MainNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
