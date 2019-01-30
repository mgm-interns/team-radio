import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeType } from '@Themes';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  container: {
    width: '100%',
    height: 64
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  playing: {
    background: palette.type === ThemeType.DARK ? palette.grey[900] : palette.grey[200]
  },
  thumbnailContainer: {
    position: 'relative'
  },
  thumbnail: {
    borderRadius: 0,
    width: 80,
    height: 56
  },
  thumbnailDuration: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingLeft: spacing.smallUnit,
    paddingRight: spacing.smallUnit,
    fontSize: 10,
    backgroundColor: palette.common.transparent(0.66),
    borderTopLeftRadius: spacing.smallUnit
  },
  text: {
    '& >*': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  primaryText: {
    marginBottom: spacing.unit
  },
  secondaryText: {
    marginTop: spacing.smallUnit
  },
  userAvatar: {
    width: 20,
    height: 20,
    fontSize: 12,
    color: palette.common.white
  }
}));
