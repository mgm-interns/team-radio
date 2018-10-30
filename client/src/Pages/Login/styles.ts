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
    cardContainer: {
      background: palette.common.transparent(0.5)
    },
    facebookLoginButton: {
      background: palette.common.facebookButtonBG,
      color: palette.common.white,

      '&:hover': {
        background: palette.common.facebookButtonHoverBG
      }
    },
    googleLoginButton: {
      background: palette.common.googleButtonBG,
      color: palette.common.white,

      '&:hover': {
        background: palette.common.googleButtonHoverBG
      }
    },
    cardHeaderTitle: {
      marginBottom: spacing.mediumUnit,
      textAlign: 'center',
      color: palette.common.white
    },
    loginActions: {
      justifyContent: 'space-evenly'
    },
    textFieldsContainer: {
      marginLeft: 12,
      marginRight: 12
    },
    textField: {
      marginBottom: spacing.mediumUnit
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
    cardActions: {
      display: 'flex',
      flexDirection: 'column'
    },
    textLink: {
      marginTop: spacing.largeUnit,

      '& p': {
        textDecoration: 'underline'
      },

      '&:hover p': {
        color: palette.common.white
      }
    }
  });
