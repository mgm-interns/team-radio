import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ breakpoints }: Theme) =>
  createStyles({
    root: {
      [breakpoints.down('sm')]: {
        margin: 0,
        width: '100%'
      }
    }
  });
