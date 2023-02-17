import { createSlice } from '@reduxjs/toolkit';

interface IUserSlice {
  user: {
    email: Email;
    firstName: string;
    lastName: string;
  };
  error: string;
}

const initialState = {
  user: {
    email: '',
    firstName: '',
    lastName: '',
  },
  error: '',
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
          lastName: action.payload.lastName,
        };
        state.error = '';
      }
    },
    signOut(state) {
      state.user = initialState.user;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
