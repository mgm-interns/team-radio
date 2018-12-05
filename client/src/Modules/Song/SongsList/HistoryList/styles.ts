import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
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
        width: `calc(100% - 48px)`
      }
    }
  });
