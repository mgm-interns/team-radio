import { createMuiTheme } from '@material-ui/core';
import Red from '@material-ui/core/colors/red';
import { rgba } from './rgba';

export const dark = createMuiTheme({
  metrics: {
    headerHeight: 64
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#f0b5a7',
      main: '#e06a4e',
      mainGradient: 'linear-gradient(to right, #f46b45, #eea849)',
      dark: '#d34d35',
      contrastText: '#fff'
    },
    secondary: {
      light: '#484848',
      main: '#212121',
      mainGradient: 'linear-gradient(to right, #303030, #434343)',
      dark: '#000000',
      contrastText: '#fff'
    },
    error: {
      light: Red['200'],
      main: Red['500'],
      dark: Red['800'],
      mainGradient: 'linear-gradient(to right, #cb2d3e, #ef473a)'
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
