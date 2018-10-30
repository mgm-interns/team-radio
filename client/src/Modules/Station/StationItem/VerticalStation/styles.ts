import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing, breakpoints }: RadioTheme) =>
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
      height: 48,
      objectFit: 'cover'
    },
    stationInfo: {
      marginLeft: spacing.mediumUnit,
      width: `calc(100% - 64px)`
    },
    stationName: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '100%',
      fontSize: 14,
      [breakpoints.up('lg')]: {
        fontSize: 16
      }
    },
    onlineNumber: {
      fontSize: 12,
      [breakpoints.up('lg')]: {
        fontSize: 14
      }
    }
  });
