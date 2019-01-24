import * as React from 'react';

/**
 *
 */
export function useLocalStorage<T extends string>(key: string, initialValue: T): [T, (value: T) => void] {
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

/**
 *
 */
const MUTED_KEY = 'muted';
type MutedState = 'true' | 'false';
export function useMutedLocalStorage<T extends boolean>(initialValue: T): [T, (value: T) => void] {
  const [state, setState] = useLocalStorage<MutedState>(MUTED_KEY, initialValue ? 'true' : 'false');
  return [JSON.parse(state), value => setState(JSON.stringify(value) as MutedState)];
}
