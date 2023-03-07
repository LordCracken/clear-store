import { Dispatch } from '@reduxjs/toolkit';
import { AuthErrorCodes } from 'firebase/auth';
import { userActions } from '../slice';
import { AuthService } from '../../../gateways';
import { SignUpCase } from '../../../../domain/useCases';

export const signUpAction = (email: Email, password: Password) => async (dispatch: Dispatch) => {
  dispatch(userActions.updateStatus({ status: 'loading', message: 'Загрузка...' }));

  try {
    const service = new AuthService();
    const useCase = new SignUpCase(service);
    const user = await useCase.signUp(email, password);

    dispatch(userActions.signIn(user));
    dispatch(userActions.updateStatus({ status: 'success', message: 'Добро пожаловать!' }));
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        dispatch(userActions.updateStatus({ status: 'error', message: 'Email уже занят' }));
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Пароль должен быть длиннее 6 символов',
          }),
        );
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Неверный формат Email',
          }),
        );
        break;
      default:
        dispatch(
          userActions.updateStatus({
            status: 'error',
            message: 'Не удалось зарегистрироваться',
          }),
        );
    }
  }
};
