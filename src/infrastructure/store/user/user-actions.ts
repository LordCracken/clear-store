import { Dispatch } from '@reduxjs/toolkit';

import signIn from '../../../adapters/signIn';
import signOut from '../../../adapters/signOut';

import data from '../../data';
import { userActions } from './user-slice';

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  //  sending data & get response
  const response = await new Promise(resolve => {
    resolve(signIn(data, email, password));
  });

  //  check data
  if (typeof response === 'string') {
    dispatch(userActions.setError(response));
  } else {
    dispatch(userActions.signIn(response));
  }
};

export const signOutUser = (email: Email) => async (dispatch: Dispatch) => {
  const isExited = await new Promise(resolve => {
    resolve(signOut(data, email));
  });

  if (isExited) {
    dispatch(userActions.signOut());
  }
};
