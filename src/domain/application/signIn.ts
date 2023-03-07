import { User } from '../entities';

export type SignInService = (email: Email, password: Password) => Promise<User>;

export class signIn {
  signInService: SignInService;

  constructor(service: SignInService) {
    this.signInService = service;
  }

  async signIn(email: Email, password: Password) {
    return this.signInService(email, password);
  }
}
