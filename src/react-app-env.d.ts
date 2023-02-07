declare module '*.module.scss';
declare module '*.jpg' {
  const value: string;
  export = value;
}

type UniqueID = string;
type Email = string;
type Password = string;
type ImageURL = string;
type DateTime = string;
