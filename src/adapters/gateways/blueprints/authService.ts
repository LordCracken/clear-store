import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Service } from './service';

export abstract class AuthService extends Service {
  protected auth = getAuth();
  protected uid = '';

  protected constructor() {
    super();
    onAuthStateChanged(this.auth, user => {
      if (user) this.uid = user.uid;
    });
  }
}
