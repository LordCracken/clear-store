import AppData from './appData';
import identification from '../domain/application/identification';

const signIn = (path: AppData, email: Email, password: Password) => {
  const users = path.users;
  return identification(email, password, users);
};

export default signIn;
