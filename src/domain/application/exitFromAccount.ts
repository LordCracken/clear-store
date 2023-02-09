import User from '../entities/user';

type IExitFunc = (email: Email, users: User[]) => boolean;

const exitFromAccount: IExitFunc = (email, users) => {
  const desiredUser = users.find(user => user.email === email);

  if (desiredUser && desiredUser.isAuth) {
    desiredUser.signOut();
    return !desiredUser.isAuth;
  }

  return false;
};

export default exitFromAccount;
