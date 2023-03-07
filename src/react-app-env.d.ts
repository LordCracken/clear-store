declare module '*.module.scss';
declare module '*.jpg' {
  const value: string;
  export = value;
}

type ValueOf<T> = T[keyof T];

type UniqueID = string;
type Email = string;
type Password = string;
type ImageURL = string;
type DateTime = string;

declare type Statuses = 'loading' | 'success' | 'error';

declare interface AuthError extends Error {
  code: ValueOf<typeof import('firebase/auth').AuthErrorCodes>;
}
