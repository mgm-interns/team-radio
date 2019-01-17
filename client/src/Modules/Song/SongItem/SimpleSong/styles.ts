import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeType } from 'Themes';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
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
      textOverflow: 'ellipsis'
    }
  }
}));
