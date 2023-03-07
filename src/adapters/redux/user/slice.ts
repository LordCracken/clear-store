import { createSlice } from '@reduxjs/toolkit';
import { CartData, OrderData } from '../../../domain/entities/DTO';

interface IUser {
  isAuthenticated: boolean;
  firstName: string;
  lastName: string;
  cart?: CartData;
  orders?: OrderData[];
  status?: Statuses;
  statusMsg?: string;
}

const initialState: IUser = { isAuthenticated: false, firstName: '', lastName: '' };

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
