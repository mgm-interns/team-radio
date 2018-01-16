export default ({ palette, breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    width: spacing.fullWidth,
    background: palette.secondary['500'],
    position: 'relative',
  },
  foreground: {
    height: spacing.fullViewportHeight,
    width: spacing.fullWidth,
    zIndex: 0,
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
      height: '90vh',
    },
  },
  sloganContainer: {
    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  backgroundImg: {
    position: 'absolute',
    width: spacing.fullWidth,
    height: spacing.fullViewportHeight,
    top: 0,
    left: 0,
    margin: 'auto',
    filter: 'opacity(0.7)',
    zIndex: -1,
    objectFit: 'cover',
    [breakpoints.up('lg')]: {
      height: '90vh',
    },
  },
  mainLine: {
    cursor: 'default',
    color: palette.white,
    fontSize: '3em',
    [breakpoints.up('md')]: {
      fontSize: '7em',
    },
  },
  sloganText: {
    cursor: 'default',
    fontSize: '2rem',
    fontWeight: '200',
    color: palette.white,
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.up('sm')]: {
      fontSize: '2.5rem',
    },
  },
  formInput: {
    flexGrow: 0,
    margin: 'auto',
    zIndex: 2,
    '& input': {
      color: palette.white,
    },
    '& label': {
      color: palette.white,
    },
    '& div': {
      [breakpoints.down('sm')]: {
        width: '80vw',
      },
    },
    '& div::before': {
      backgroundColor: palette.primary['500'],
    },
    '& div::after': {
      backgroundColor: palette.primary['500'],
      color: palette.primary['500'],
    },
    '& button': {
      [breakpoints.down('sm')]: {
        width: '80vw',
      },
      [breakpoints.up('sm')]: {
        marginLeft: '2em',
      },
    },
    [breakpoints.up('sm')]: {
      flexGrow: 1,
      textAlign: 'center',
    },
  },
  textField: {
    [breakpoints.down('sm')]: {
      marginTop: '5em',
      paddingBottom: '1em',
    },
    [breakpoints.up('sm')]: {
      marginTop: '7em',
      width: '30vh',
    },
  },
  buttonSend: {
    '&[disabled]': {
      backgroundColor: 'rgba(224,106,78,.25)',
      color: 'rgba(255,255,255,.25)',
    },
  },
  sendIcon: {
    paddingLeft: '0.5em',
  },
});
