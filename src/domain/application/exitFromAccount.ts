import User from '../entities/user';

type IExitFunc = (email: Email, users: User[]) => void;

const exitFromAccount: IExitFunc = (email, users) => {
  const desiredUser = users.find(user => user.email === email);

  if (desiredUser && desiredUser.isAuth) {
    desiredUser.signOut();
  }
};

export default exitFromAccount;
