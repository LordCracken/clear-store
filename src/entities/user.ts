class User {
  readonly id: UniqueID;
  firstName: string;
  lastName: string;
  email: Email;

  constructor(id: UniqueID, firstName: string, lastName: string, email: Email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export default User;
