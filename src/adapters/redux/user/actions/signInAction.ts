import { Dispatch } from '@reduxjs/toolkit';
import { AuthErrorCodes } from 'firebase/auth';
import { userActions } from '../slice';
import { UserService } from '../../../gateways';
import { SignInCase } from '../../../../domain/useCases';

export const signInAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));
  const service = new UserService();
  const useCase = new SignInCase(service);

  try {
    const { firstName, lastName } = await useCase.signIn(email, password);
    dispatch(userActions.signIn({ firstName, lastName }));
    sessionStorage.removeItem('cart');
    dispatch(userActions.updateStatus({ status: 'success', message: 'С возвращением!' }));
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.INVALID_PASSWORD:
        dispatch(userActions.updateStatus({ status: 'error', message: 'Неверный пароль' }));
        break;
      case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Слишком много неудачных попыток. Попробуйте войти позже',
          }),
        );
        break;
      case AuthErrorCodes.USER_DELETED:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Пользователя с таким Email не существует',
          }),
        );
        break;
      default:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Не удалось войти в аккаунт',
          }),
        );
    }
  }
};
