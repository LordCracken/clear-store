import { User } from '../entities';

export interface SignUpService {
  signUp: (email: Email, password: Password) => Promise<User>;
}

export class SignUpCase {
  signUpService: SignUpService;

  constructor(service: SignUpService) {
    this.signUpService = service;
  }

  async signUp(email: Email, password: Password) {
    return this.signUpService.signUp(email, password);
  }
}
