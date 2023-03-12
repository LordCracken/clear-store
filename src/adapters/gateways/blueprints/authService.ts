import { getAuth } from 'firebase/auth';
import { Service } from './service';

export abstract class AuthService extends Service {
  protected auth = getAuth();
  protected uid = '';
  protected usersUrl = '';

  protected constructor() {
    super();
    this.uid = this.auth.currentUser?.uid ?? '';
    this.usersUrl = `${this.baseUrl}/users`;
  }
}
