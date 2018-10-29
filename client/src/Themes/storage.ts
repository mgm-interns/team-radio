import { ThemeType } from './interfaces';

export namespace ThemeLocalStorageHelper {
  const KEY = 'theme';

  export function set(theme: ThemeType | 'light' | 'dark') {
    window.localStorage.setItem(KEY, theme);
  }

  export function get(): ThemeType {
    const value = window.localStorage.getItem(KEY);
    if (value === ThemeType.LIGHT || value === ThemeType.DARK) {
      return value;
    }
    set(ThemeType.LIGHT);
    return ThemeType.LIGHT;
  }
}
