import { ChangeEvent, useEffect, useState } from 'react';

type ruleFunc = (value: string) => boolean;

export const useInput = (rule: ruleFunc, message: string) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  useEffect(() => {
    if (!rule(value) && isTouched) {
      setError(message);
    } else {
      setError('');
    }
  }, [value, isTouched]);

  const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    value,
    error,
    setIsTouchedHandler: () => {
      setIsTouched(true);
    },
    valueChangeHandler,
  };
};
