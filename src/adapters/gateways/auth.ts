import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { User } from '../../domain/entities';
import { SignInService, SignOutService, SignUpService } from '../../domain/useCases';

export class AuthService implements SignUpService, SignInService, SignOutService {
  private auth = getAuth();
  private baseUrl = 'https://clean-store-e7a58-default-rtdb.europe-west1.firebasedatabase.app/';
  private uid = '';
  private cartUrl = '';
  private ordersUrl = '';

  constructor() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        this.uid = user.uid;
        this.cartUrl = `${this.baseUrl}/${this.uid}/cart.json`;
        this.ordersUrl = `${this.baseUrl}/${this.uid}/orders.json`;
      }
    });
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
