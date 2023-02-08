import { Dispatch } from '@reduxjs/toolkit';

import authenticate from '../../domain/application/authenticate';
import exitFromAccount from '../../domain/application/exitFromAccount';

import data from '../data';
import { userActions } from './user-slice';

export const signInUser = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  //  sending data & get response
  const user = await new Promise(resolve => {
    resolve(authenticate(email, password, data.users));
  });

  //  check data

  dispatch(userActions.signIn(user));
};

export const signOutUser = (email: Email) => async (dispatch: Dispatch) => {
  await exitFromAccount(email, data.users);

  dispatch(userActions.signOut());
};
