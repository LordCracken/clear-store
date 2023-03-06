class User {
  readonly id: UniqueID;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: Email;
  readonly password: Password;
  isAuth = false;

  constructor(id: UniqueID, firstName: string, lastName: string, email: Email, password: Password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  signIn() {
    this.isAuth = true;
  }

  signOut() {
    this.isAuth = false;
  }
}

export default User;
