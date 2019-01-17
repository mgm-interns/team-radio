import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  stationContainer: {
    margin: spacing.largeUnit,
    display: 'inline-block',
    width: 150
  },
  avatarContainer: {
    position: 'relative'
  },
  img: {
    width: '100%',
    height: 150,
    objectFit: 'cover'
  },
  onlineNumber: {
    position: 'absolute',
    bottom: spacing.smallUnit / 2,
    padding: `${spacing.smallUnit / 2}px ${spacing.smallUnit}px`,
    marginBottom: spacing.smallUnit / 2,
    width: '100%',
    background: palette.common.transparent(0.5),
    color: palette.common.white
  },
  stationName: {
    color: palette.common.black,
    '& > *': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%'
    }
  }
}));
