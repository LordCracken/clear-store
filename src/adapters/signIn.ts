import AppData from './appData';
import authenticate from '../domain/application/authenticate';

const signIn = (path: AppData, email: Email, password: Password) => {
  const users = path.users;
  authenticate(email, password, users);
};

export default signIn;
