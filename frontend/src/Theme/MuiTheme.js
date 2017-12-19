import { createMuiTheme } from 'material-ui/styles';
// import orange from 'material-ui/colors/orange';
import grey from 'material-ui/colors/grey';
import { jellyBean, sunray, mummyTomb, richBlack } from './Color';

export default createMuiTheme({
  palette: {
    primary: jellyBean,
    secondary: richBlack,
  },
  status: {
    danger: 'orange',
  },
});
