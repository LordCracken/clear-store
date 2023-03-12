import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';
import { UserService } from '../../../gateways';
import { SignOutCase } from '../../../../domain/useCases';

export const signOutAction = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

  try {
    const service = new UserService();
    const useCase = new SignOutCase(service);
    await useCase.signOut();

    dispatch(userActions.signOut());
    sessionStorage.removeItem('cart');
    dispatch(userActions.updateStatus({ status: 'success', message: 'До встречи!' }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(
        userActions.updateStatus({
          status: 'error',
          message: 'Не удалось выйти из аккаунт',
        }),
      );
    }
  }
};
