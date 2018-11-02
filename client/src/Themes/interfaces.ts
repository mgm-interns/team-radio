import { Theme } from '@material-ui/core';
import { CommonColors } from '@material-ui/core/colors/common';
import { Palette } from '@material-ui/core/styles/createPalette';
import { Spacing } from '@material-ui/core/styles/spacing';
import { ZIndex } from '@material-ui/core/styles/zIndex';

interface RadioSpacing extends Spacing {
  smallUnit: number;
  mediumUnit: number;
  largeUnit: number;
  hugeUnit: number;
}

interface RadioCommonColors extends CommonColors {
  facebookButtonBG: string;
  googleButtonBG: string;
  facebookButtonHoverBG: string;
  googleButtonHoverBG: string;
  online: string;
  transparent(a?: number): string;
}

interface RadioPalette extends Palette {
  common: RadioCommonColors;
}

interface RadioZIndex extends ZIndex {
  fullScreenLoading: number;
}

interface RadioMetrics {
  headerHeight: number;
}

export interface RadioTheme extends Theme {
  spacing: RadioSpacing;
  palette: RadioPalette;
  metrics: RadioMetrics;
  zIndex: RadioZIndex;
}

export type ThemeType = 'light' | 'dark';
export const ThemeType: { LIGHT: 'light'; DARK: 'dark' } = { LIGHT: 'light', DARK: 'dark' };

export type SwitchThemeFunction = (theme?: ThemeType) => void;

export interface IThemeContext {
  theme: RadioTheme;
  switchTheme: SwitchThemeFunction;
}