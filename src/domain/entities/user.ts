export class User {
  readonly id: UniqueID;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: Email;
  readonly password: Password;

  constructor(id: UniqueID, firstName: string, lastName: string, email: Email, password: Password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
