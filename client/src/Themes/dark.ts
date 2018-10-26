import { createMuiTheme } from '@material-ui/core';
import { RadioTheme } from './interfaces';
import { rgba } from './rgba';

export const dark = createMuiTheme({
  metrics: {
    headerHeight: 64
  },
  palette: {
    type: 'dark',
    primary: {
      50: '#fbedea',
      100: '#f6d2ca',
      200: '#f0b5a7',
      light: '#f0b5a7',
      300: '#e99783',
      400: '#e58069',
      500: '#e06a4e',
      main: '#e06a4e',
      600: '#dc6247',
      700: '#d8573d',
      800: '#d34d35',
      dark: '#d34d35',
      900: '#cb3c25',
      A100: '#ffffff',
      A200: '#ffd9d4',
      A400: '#ffaca1',
      A700: '#ff9687',
      contrastText: '#fff'
    },
    secondary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff'
    },
    common: {
      rgba,
      black: '#000',
      white: '#fff',
      transparent: (alpha: number = 0) => rgba({ alpha }),
      facebookButtonBG: '#4267b2',
      facebookButtonHoverBG: rgba({ red: 66, green: 103, blue: 178, alpha: 0.5 }),
      googleButtonBG: '#db4437',
      googleButtonHoverBG: rgba({ red: 219, green: 68, blue: 55, alpha: 0.5 }),
      online: '#4c8c4a'
    }
  },
  spacing: {
    smallUnit: 4,
    mediumUnit: 8,
    largeUnit: 16,
    hugeUnit: 32
  },
  typography: {
    useNextVariants: true
  }
} as any) as RadioTheme;
