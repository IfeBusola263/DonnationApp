import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {userProps} from '../types';

const initialState: userProps = {
  firstName: 'Light',
  lastName: 'Ogunbayo',
  id: 1,
  avatar:
    'https://cdn.dribbble.com/users/1577045/screenshots/4914645/media/028d394ffb00cb7a4b2ef9915a384fd9.png?compress=1&resize=400x300&vertical=top',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<{firstName: string}>) => {
      state.firstName = action.payload.firstName;
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const {updateUser, clearUserData} = userSlice.actions;
