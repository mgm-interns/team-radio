import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, zIndex }: Theme) => ({
  avatar: {
    background: palette.common.white,
    width: '1.25em',
    height: '1.25em'
  }
}));
