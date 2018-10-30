import { ThemeType } from './interfaces';

export const ThemeLocalStorageHelper = {
  KEY: 'theme',

  set(theme: ThemeType) {
    window.localStorage.setItem(ThemeLocalStorageHelper.KEY, theme);
  },

  get(): ThemeType {
    const value = window.localStorage.getItem(ThemeLocalStorageHelper.KEY);
    if (value === ThemeType.LIGHT || value === ThemeType.DARK) {
      return value;
    }
    ThemeLocalStorageHelper.set(ThemeType.LIGHT);
    return ThemeType.LIGHT;
  }
};
