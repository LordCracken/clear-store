import User from '../entities/user';

interface IUserObj {
  email: Password;
  firstName: string;
  lastName: string;
}
type IAuthFunc = (email: Email, password: Password, users: User[]) => IUserObj | string;

const identification: IAuthFunc = (email, password, users) => {
  const desiredUser = users.find(user => user.email === email);

  if (desiredUser && desiredUser.password === password) {
    desiredUser.signIn();
    const { email, firstName, lastName } = desiredUser;
    return { email, firstName, lastName };
  } else {
    return 'Не найдена такая комбинация email и пароля';
  }
};

export default identification;
