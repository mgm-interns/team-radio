export default ({ palette, breakpoints }) => ({
  container: {
    margin: 'auto',
    width: '100%',
    background: palette.primary['500'],
  },
  foreground: {
    height: '80vh',
    width: '100%',
    zIndex: 0,
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  sloganContainer: {
    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  backgroundImg: {
    position: 'absolute',
    width: '100%',
    height: '80vh',
    top: 0,
    left: 0,
    margin: 'auto',
    filter: 'opacity(0.9)',
    zIndex: -1,
    objectFit: 'cover',
  },
  mainLine: {
    fontFamily: 'Pacifico',
    fontSize: '7em',
    color: 'white',
  },
  sloganText: {
    fontSize: '2rem',
    fontWeight: '200',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.up('lg')]: {
      fontSize: '2.5rem',
    },
  },
  formInput: {
    flexGrow: 0,
    margin: 'auto',
    zIndex: 2,
    '& input': {
      color: 'white',
    },
    '& label': {
      color: 'white',
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
  sendIcon: {
    paddingLeft: '0.5em',
  },
});
