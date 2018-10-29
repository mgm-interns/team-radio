import * as React from 'react';
import { dark } from './dark';
import { IThemeContext, RadioTheme, ThemeType } from './interfaces';
import { light } from './light';
import { ThemeLocalStorageHelper } from './storage';

export const themes: { light: RadioTheme; dark: RadioTheme } = { light, dark };

export const ThemeContext = React.createContext<IThemeContext>({
  theme: ThemeLocalStorageHelper.get() === ThemeType.LIGHT ? themes.light : themes.dark,
  switchTheme: (theme?: ThemeType) => ({})
});
