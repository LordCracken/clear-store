import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { AuthService } from './';
import { User } from '../../domain/entities';
import { SignInService, SignOutService, SignUpService } from '../../domain/useCases';

export class UserService
  extends AuthService
  implements SignUpService, SignInService, SignOutService
{
  private cartUrl = `${this.baseUrl}/${this.uid}/cart.json`;
  private ordersUrl = `${this.baseUrl}/${this.uid}/orders.json`;

  constructor() {
    super();
  }

  async signUp(email: Email, password: Password) {
    await createUserWithEmailAndPassword(this.auth, email, password);

    const cart = await fetch(this.cartUrl).then(res => res.json());
    const orders = await fetch(this.ordersUrl).then(res => res.json());

    return new User('', '', cart, orders);
  }

  async signIn(email: Email, password: Password) {
    await signInWithEmailAndPassword(this.auth, email, password);

    const cart = await fetch(this.cartUrl).then(res => res.json());
    const orders = await fetch(this.ordersUrl).then(res => res.json());

    return new User('', '', cart, orders);
  }

  async signOut() {
    await signOut(this.auth);
    await this.auth.updateCurrentUser(null);
  }
}
