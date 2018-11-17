import { createStyles, Theme } from '@material-ui/core';
import { ThemeType } from 'Themes';

export const styles = ({ palette, spacing }: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: 64
    },
    playing: {
      background: palette.type === ThemeType.DARK ? palette.grey[900] : palette.grey[200]
    },
    thumbnail: {
      borderRadius: 0,
      width: 80,
      height: 45
    },
    text: {
      '& >*': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: `calc(100% - 108px)`
      }
    }
  });
