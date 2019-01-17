import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing, typography }: Theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    width: '100%',
    height: '100%',
    overflowY: 'auto'
  },
  itemText: {
    '& >*': {
      width: `calc(100% - 108px)`
    }
  }
}));
