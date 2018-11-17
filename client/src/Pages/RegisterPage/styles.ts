import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing }: Theme) =>
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
      color: palette.common.white,
      width: '95vw',
      maxWidth: 400
    },
    cardContainer: {
      background: palette.common.transparent(0.5)
    },
    cardHeaderTitle: {
      marginBottom: spacing.mediumUnit,
      textAlign: 'center',
      color: palette.common.white
    },
    textFieldsContainer: {
      marginLeft: spacing.mediumUnit,
      marginRight: spacing.mediumUnit
    },
    textField: {
      marginBottom: spacing.hugeUnit
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
      flexDirection: 'column',
      marginLeft: spacing.smallUnit * -1,
      marginRight: spacing.smallUnit * -1
    }
  });
