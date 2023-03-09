import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCPk9eSuA26tsyqIVeQvNUO2dr7F1i6trE',
  authDomain: 'clean-store-e7a58.firebaseapp.com',
  projectId: 'clean-store-e7a58',
  storageBucket: 'clean-store-e7a58.appspot.com',
  messagingSenderId: '1046805804029',
  appId: '1:1046805804029:web:29819fd63669582ae71f94',
};

initializeApp(firebaseConfig);

export abstract class Service {
  protected baseUrl = 'https://clean-store-e7a58-default-rtdb.europe-west1.firebasedatabase.app/';
}

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

export * from './auth';
export * from './products';
