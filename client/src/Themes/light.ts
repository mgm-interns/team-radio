import { createMuiTheme, Theme } from '@material-ui/core';
import { rgba } from './rgba';

export const light = createMuiTheme({
  metrics: {
    headerHeight: 64
  },
  palette: {
    type: 'light',
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
      50: '#e2e7e7',
      100: '#b6c3c4',
      200: '#859b9d',
      light: '#859b9d',
      300: '#547375',
      400: '#2f5558',
      500: '#0a373a',
      main: '#0a373a',
      600: '#093134',
      700: '#072a2c',
      800: '#052325',
      dark: '#052325',
      900: '#031618',
      A100: '#58e5ff',
      A200: '#25ddff',
      A400: '#00ccf1',
      A700: '#00b6d7'
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
  },
  zIndex: {
    fullScreenLoading: 1999,
    stationPlayerContainer: 999
  }
});
