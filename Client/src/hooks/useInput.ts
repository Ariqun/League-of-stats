import { useState } from 'react';

const useInput = (initialValue: string): ReturnTypes => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
    setError(false);
  };

  return [value, onChange, error, setError];
};

type ReturnTypes = [
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
];

export default useInput;
