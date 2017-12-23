export default ({ palette, breakpoints }) => ({
  container: {
    margin: 'auto',
    width: '100vw',
    background: palette.darkGreen['500'],
  },
  foreground: {
    height: '100vh',
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
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    margin: 'auto',
    filter: 'opacity(0.6)',
    zIndex: -1,
    objectFit: 'cover',
  },
  sloganText: {
    fontSize: '2.5rem',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.up('lg')]: {
      fontSize: '3rem',
    },
  },
  formInput: {
    // flexGrow: 0,
    margin: 'auto',
    // zIndex: 2,
    // '& input': {
    // color: 'white',
    // },
    // '& label': {
    // color: 'white',
    // },
    // '& div': {
    //   [breakpoints.down('sm')]: {
    //     width: '80vw',
    //   },
    // },
    // '& div::before': {
    //   backgroundColor: palette.primary['500'],
    // },
    // '& div::after': {
    //   backgroundColor: palette.primary['500'],
    //   color: palette.primary['500'],
    // },
    // '& button': {
    // [breakpoints.down('sm')]: {
    //   width: '80vw',
    // },
    // [breakpoints.up('sm')]: {
    //   marginLeft: '2em',
    // },
    // },
    // [breakpoints.up('sm')]: {
    //   flexGrow: 1,
    //   textAlign: 'center',
    // },
  },
  textField: {
    width: '100%',
    // [breakpoints.down('sm')]: {
    //   marginTop: '5em',
    //   paddingBottom: '1em',
    // },
    // [breakpoints.up('sm')]: {
    //   marginTop: '10em',
    //   width: '40vh',
    // },
  },
  sendIcon: {
    paddingLeft: '0.5em',
  },

  card: {
    minWidth: '80em',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: '16',
    fontSize: '14',
    color: palette.primary,
  },
  pos: {
    marginBottom: '12',
    color: palette.primary,
  },
});
