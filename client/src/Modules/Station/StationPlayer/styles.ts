import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'inherit',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
