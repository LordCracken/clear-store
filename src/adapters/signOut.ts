import AppData from './appData';
import exitFromAccount from '../domain/application/exitFromAccount';

const signOut = (path: AppData, email: Email) => {
  const users = path.users;
  exitFromAccount(email, users);
};

export default signOut;
