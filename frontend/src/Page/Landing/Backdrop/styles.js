export default ({ palette, breakpoints }) => ({
  // backdrop cover
  backdropContainer: {
    position: 'relative',
    margin: 'auto',
    padding: 'auto',
    width: '100%',
  },
  backdropForeground: {
    background: palette.darkGreen['500'],
    // height: '40vh',
    // alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    margin: 0,
    padding: '8%',
    [breakpoints.down('lg')]: {
      // height: '40vh',
      paddingTop: '15em',
      alignItems: 'center',
    },
    [breakpoints.up('lg')]: {
      height: '65vh',
      paddingBottom: '2em',
    },
  },
  backdropSloganContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  backdropImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 'auto',
    filter: 'opacity(0.3)',
    zIndex: -1,
    objectFit: 'cover',
  },
  backdropSlogan: {
    fontSize: '20pt',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.up('lg')]: {
      fontSize: '40pt',
    },
  },
  formInput: {
    margin: 'auto',
    zIndex: 2,
    textAlign: 'center',
    '& input': {
      color: 'white',
    },
    '& label': {
      color: 'white',
    },
    '& div': {
      [breakpoints.down('sm')]: {
        width: '100%',
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
        width: '100%',
      },
    },
  },
  textField: {
    paddingRight: '1.5em',
    [breakpoints.up('lg')]: {
      width: '30%',
    },
  },
  sendIcon: {
    paddingLeft: '0.5em',
  },
});
