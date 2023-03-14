import { User } from '../../entities';

export interface SignInService {
  signIn: (email: Email, password: Password) => Promise<User>;
}

export class SignInCase {
  private signInService: SignInService;

  constructor(service: SignInService) {
    this.signInService = service;
  }

  async signIn(email: Email, password: Password) {
    return this.signInService.signIn(email, password);
  }
}
