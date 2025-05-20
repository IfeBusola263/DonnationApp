import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore, type PersistConfig} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userReducer from './slices/userSlice';
import CategoryReducer from './slices/categorySlice';

// combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  category: CategoryReducer,
});

// Persistor configuration
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};
// Create Persistor
const persistedReducer = persistReducer(persistConfig, rootReducer);

//  Connect to the store

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

//  Persist Store Function creates a store that an persist the state.
// Capabale of saving and retriving data fom state.
export const persistor = persistStore(store);

// Shape of the data stored on the State
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
