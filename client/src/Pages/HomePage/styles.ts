import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeType } from '@Themes';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
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
      borderBottomColor: palette.type === ThemeType.LIGHT ? palette.primary.main : undefined
    },

    '&::after': {
      borderBottomColor: palette.type === ThemeType.DARK ? palette.common.white : undefined
    }
  },
  inputLabel: {
    color: `${palette.common.white} !important`
  },
  disabled: {
    color: palette.common.white
  },
  createButtonLabel: {
    marginLeft: spacing.smallUnit
  },
  stations: {
    display: 'flex',
    overflowX: 'scroll',
    background: '#f4f0ea',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    minHeight: 214
  }
}));
