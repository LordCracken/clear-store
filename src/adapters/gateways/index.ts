import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCPk9eSuA26tsyqIVeQvNUO2dr7F1i6trE',
  authDomain: 'clean-store-e7a58.firebaseapp.com',
  projectId: 'clean-store-e7a58',
  storageBucket: 'clean-store-e7a58.appspot.com',
  messagingSenderId: '1046805804029',
  appId: '1:1046805804029:web:29819fd63669582ae71f94',
};

initializeApp(firebaseConfig);

export * from './auth';
