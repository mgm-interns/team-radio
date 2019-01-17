import * as React from 'react';

export function useLocalStorage<T extends string>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState<T>(() => {
    const value = window.localStorage.getItem(key) as T;
    if (!value) {
      window.localStorage.setItem(key, initialValue);
      return initialValue;
    }
    return value;
  });

  const setItem = (value: T) => {
    setState(value);
    window.localStorage.setItem(key, value);
  };

  return [state, setItem];
}

const MUTED_KEY = 'muted';
export function useMute() {
  return useLocalStorage(MUTED_KEY, 'false');
}
