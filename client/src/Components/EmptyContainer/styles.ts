import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  container: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    display: 'block',
    width: 80,
    height: 80
  },
  text: {}
}));
