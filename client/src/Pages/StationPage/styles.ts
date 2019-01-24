import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ zIndex }: Theme) => ({
  playerContainer: {
    zIndex: zIndex.appBar,
    position: 'fixed'
  }
}));
