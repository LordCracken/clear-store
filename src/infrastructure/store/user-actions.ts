import { Dispatch } from '@reduxjs/toolkit';

import signIn from '../../adapters/signIn';
import signOut from '../../adapters/signOut';

import data from '../data';
import { userActions } from './user-slice';

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  //  sending data & get response
  const user = await new Promise(resolve => {
    resolve(signIn(data, email, password));
  });

  //  check data

  dispatch(userActions.signIn(user));
};

export const signOutUser = (email: Email) => async (dispatch: Dispatch) => {
  await signOut(data, email);

  dispatch(userActions.signOut());
};
