import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import grey from 'material-ui/colors/grey';

export default createMuiTheme({
  palette: {
    primary: orange,
    secondary: grey,
  },
  status: {
    danger: 'orange',
  },
});
