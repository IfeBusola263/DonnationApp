import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userProps} from '../types';

const initialState: userProps = {
  firstName: '',
  lastName: '',
  id: 0,
  email: '',
  token: null,
  isLoggedIn: false,
  avatar:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

type AuthState = typeof initialState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        email: string;
        displayName: string | null;
      }>,
    ) => {
      const name = action.payload.displayName
        ? action.payload.displayName.split(' ')
        : [];
      return {
        ...state,
        firstName: name[0] ?? '',
        lastName: name[1] ?? '',
        email: action.payload.email,
        token: action.payload.token,
        isLoggedIn: true,
      };
    },
    updateUser: (
      state,
      action: PayloadAction<{[P in keyof AuthState]?: AuthState[P]}>,
    ) => {
      Object.assign(state, action.payload);
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {login, updateUser, clearUserData} = userSlice.actions;
