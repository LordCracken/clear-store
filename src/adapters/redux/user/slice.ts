import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../domain/entities';

interface IUser extends User {
  isAuthenticated: boolean;
  status?: Statuses;
  statusMsg?: string;
}

const initialState: IUser = {
  isAuthenticated: false,
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusMsg = action.payload.message;
    },
    signIn: (state, action) => {
      return { ...state, ...action.payload, isAuthenticated: true };
    },
    signOut: () => initialState,
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
