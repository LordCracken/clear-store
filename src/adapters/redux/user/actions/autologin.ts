import { Dispatch } from '@reduxjs/toolkit';
import { userActions } from '../slice';
import { UserService } from '../../../gateways';
import { AutologinCase } from '../../../../domain/useCases';

export const autologin = () => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));
  const service = new UserService();
  const useCase = new AutologinCase(service);

  try {
    const { firstName, lastName } = await useCase.autologin();
    dispatch(userActions.signIn({ firstName, lastName }));
    dispatch(userActions.updateStatus({ status: 'success', message: 'С возвращением!' }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(
        userActions.updateStatus({
          status: 'error',
          message: 'Не удалось войти в аккаунт',
        }),
      );
    }
  }
};
