import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, zIndex }: Theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fullScreen: {
    position: 'fixed',
    backgroundColor: palette.background.paper,
    zIndex: zIndex.fullScreenLoading
  }
}));
