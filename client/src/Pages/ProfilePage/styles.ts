import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  appBar: {
    background: palette.common.transparent(0.2)
  }
}));
