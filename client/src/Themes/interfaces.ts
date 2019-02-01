import { RGBA } from './rgba';

declare module '@material-ui/core/styles/createPalette' {
  interface SimplePaletteColorOptions {
    mainGradient: string;
  }

  interface PaletteColor {
    mainGradient: string;
  }

  interface Palette {
    warning: PaletteColor | SimplePaletteColorOptions;
  }

  interface PaletteOptions {
    warning: PaletteColor | SimplePaletteColorOptions;
  }
}

declare module '@material-ui/core/styles/spacing' {
  interface Spacing {
    smallUnit: number;
    mediumUnit: number;
    largeUnit: number;
    hugeUnit: number;
    headerHeight: number;
  }
}

declare module '@material-ui/core/colors/common' {
  interface CommonColors {
    facebookButtonBG: string;
    googleButtonBG: string;
    facebookButtonHoverBG: string;
    googleButtonHoverBG: string;
    online: string;
    transparent(a?: number): string;
    rgba(config: RGBA): string;
  }
}

declare module '@material-ui/core/styles/zIndex' {
  interface ZIndex {
    fullScreenLoading: number;
    stationPlayerContainer: number;
  }
}

export type ThemeType = 'light' | 'dark';
export const ThemeType: { LIGHT: 'light'; DARK: 'dark' } = { LIGHT: 'light', DARK: 'dark' };

export type SwitchThemeFunction = (theme?: ThemeType) => void;

export interface IThemeContext {
  theme: ThemeType;
  switchTheme: SwitchThemeFunction;
}
