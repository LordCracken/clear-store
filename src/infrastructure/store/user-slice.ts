import { createSlice } from '@reduxjs/toolkit';

interface IUserSlice {
  user: {
    email: Email;
    firstName: string;
    lastName: string;
  };
}

const initialState = {
  user: {
    email: '',
    firstName: '',
    lastName: ''
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState as IUserSlice,
  reducers: {
    signIn(state, action) {
      if (action.payload) {
        state.user = {
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        };
      }
    },
    signOut(state) {
      state.user = initialState.user;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
