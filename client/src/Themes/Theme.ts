import { Theme } from '@material-ui/core';
import * as React from 'react';
import { dark } from './dark';
import { IThemeContext, ThemeType } from './interfaces';
import { light } from './light';
import { ThemeLocalStorageHelper } from './storage';

export const themes: { light: Theme; dark: Theme } = { light, dark };

export const ThemeContext = React.createContext<IThemeContext>({
  theme: ThemeLocalStorageHelper.get() === ThemeType.LIGHT ? themes.light : themes.dark,
  switchTheme: (theme?: ThemeType) => ({})
});
