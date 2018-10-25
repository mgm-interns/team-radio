import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    stationContainer: {
      marginBottom: spacing.smallUnit,
      display: 'flex',
      width: '100%'
    },
    avatarContainer: {
      width: 48
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    stationInfo: {
      marginLeft: spacing.mediumUnit,
      width: `calc(100% - 64px)`
    },
    onlineNumber: {},
    stationName: {
      // '& > *': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%'
      // }
    }
  });
