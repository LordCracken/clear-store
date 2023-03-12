import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { AuthService } from './';
import { User } from '../../domain/entities';
import {
  AutologinService,
  SignInService,
  SignOutService,
  SignUpService,
} from '../../domain/useCases';

export class UserService
  extends AuthService
  implements AutologinService, SignUpService, SignInService, SignOutService
{
  private cartUrl = '';
  private ordersUrl = '';

  constructor() {
    super();
    this.cartUrl = `${this.usersUrl}/${this.uid}/cart.json`;
    this.ordersUrl = `${this.usersUrl}/${this.uid}/orders.json`;
  }

  private async getUserData(uid?: UniqueID) {
    const res = await fetch(`${this.usersUrl}/${uid ?? this.uid}.json`);
    const { firstName, lastName } = await res.json();
    return new User(firstName, lastName );
  }

  async autologin() {
    return this.getUserData();
  }

  async signUp(email: Email, password: Password) {
    const res = await createUserWithEmailAndPassword(this.auth, email, password);

    await fetch(`${this.usersUrl}/${res.user.uid}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'Tester', lastName: 'Test' }),
    });

    return new User('Tester', 'Test');
  }

  async signIn(email: Email, password: Password) {
    const res = await signInWithEmailAndPassword(this.auth, email, password);
    return this.getUserData(res.user.uid);
  }

  async signOut() {
    await signOut(this.auth);
    await this.auth.updateCurrentUser(null);
  }
}
