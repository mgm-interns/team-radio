import { createMuiTheme } from 'material-ui/styles';
import { jellyBean, sunray, pearl, mummyTomb, richBlack } from './Color';

export default createMuiTheme({
  palette: {
    primary: jellyBean,
    secondary: richBlack,
    red: jellyBean,
    yellow: sunray,
    lightGrey: pearl,
    green: mummyTomb,
    darkGreen: richBlack,
  },
  typography: {
    fontFamily: `'Roboto Slab', sans-serif`,
  },
  spacing: {
    smallMargin: 4,
    baseMargin: 8,
    doubleBaseMargin: 16,
  },
});
