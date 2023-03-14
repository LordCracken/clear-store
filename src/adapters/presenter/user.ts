import { makeAutoObservable } from 'mobx';
import { AuthErrorCodes } from 'firebase/auth';

import { AutologinCase, SignInCase, SignOutCase, SignUpCase } from '../../domain/useCases';
import { UserService } from '../gateways';

class UserStore {
  isAuthenticated = false;
  firstName = '';
  lastName = '';
  status?: Statuses;
  statusMsg?: string;
  setCartIsAuth: (value: boolean) => void;

  constructor(setCartIsAuth: (value: boolean) => void) {
    makeAutoObservable(this);
    this.setCartIsAuth = setCartIsAuth;
  }

  private setStatus = (status: Statuses, statusMsg: string) => {
    this.status = status;
    this.statusMsg = statusMsg;
  };

  private setUserInfo = (firstName: string, lastName: string, isAuth: boolean) => {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAuthenticated = isAuth;
    this.setCartIsAuth(isAuth);
  };

  signUp = async (email: Email, password: Password) => {
    this.setStatus('loading', 'Загрузка...');

    const service = new UserService();
    const useCase = new SignUpCase(service);

    try {
      const { firstName, lastName } = await useCase.signUp(email, password);
      this.setUserInfo(firstName, lastName, true);
      this.setStatus('success', 'Добро пожаловать!');
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          this.setStatus('error', 'Email уже занят');
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          this.setStatus('error', 'Пароль должен быть длиннее 6 символов');
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          this.setStatus('error', 'Неверный формат Email');
          break;
        default:
          this.setStatus('error', 'Не удалось зарегистрироваться');
      }
    }
  };

  signIn = async (email: Email, password: Password) => {
    this.setStatus('loading', 'Загрузка...');

    const service = new UserService();
    const useCase = new SignInCase(service);

    try {
      const { firstName, lastName } = await useCase.signIn(email, password);
      this.setUserInfo(firstName, lastName, true);
      sessionStorage.removeItem('cart');
      this.setStatus('success', 'С возвращением!');
    } catch (error) {
      switch ((error as AuthError).code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          this.setStatus('error', 'Неверный пароль');
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          this.setStatus('error', 'Слишком много неудачных попыток. Попробуйте войти позже');
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          this.setStatus('error', 'Пользователя с таким Email не существует');
          break;
        default:
          this.setStatus('error', 'Не удалось войти в аккаунт');
      }
    }
  };

  signOut = async () => {
    this.setStatus('loading', 'Загрузка...');

    const service = new UserService();
    const useCase = new SignOutCase(service);

    try {
      await useCase.signOut();

      this.setUserInfo('', '', false);
      sessionStorage.removeItem('cart');
      this.setStatus('success', 'До встречи!');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось выйти из аккаунт');
      }
    }
  };

  autologin = async () => {
    this.setStatus('loading', 'Загрузка...');
    const service = new UserService();
    const useCase = new AutologinCase(service);

    try {
      const { firstName, lastName } = await useCase.autologin();
      this.setUserInfo(firstName, lastName, true);
      this.setStatus('success', 'С возвращением!');
    } catch (error) {
      if (error instanceof Error) {
        this.setStatus('error', 'Не удалось войти в аккаунт');
      }
    }
  };
}

export default UserStore;
