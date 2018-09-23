import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {},
    backgroundContainer: {
      background: palette.secondary.dark,
      height: '100vh'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'opacity(0.4)'
    },
    pageInfoContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      color: palette.common.white
    },
    homeBio: {
      textAlign: 'center',
      marginBottom: spacing.hugeUnit
    },
    logo: {
      // fontFamily: 'Pacifico,sans-serif'
    },
    stationCreator: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      color: palette.common.white,

      '&::before': {
        borderBottomColor: palette.primary.main
      }
    },
    inputLabel: {
      color: palette.common.white
    },
    disabled: {
      color: palette.common.white
    },
    createButtonLabel: {
      marginLeft: spacing.smallUnit
    },
    stations: {
      overflowX: 'scroll',
      background: '#f4f0ea',
      overflowY: 'hidden',
      whiteSpace: 'nowrap'
    }
  });
