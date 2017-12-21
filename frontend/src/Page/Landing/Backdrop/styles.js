export default ({ palette, breakpoints }) => ({
  // backdrop cover
  backdropContainer: {
    position: 'relative',
    margin: 'auto',
    padding: 'auto',
  },
  backdropForeground: {
    background: palette.darkGreen['500'],
    height: '40vh',
    // alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    margin: 0,
    padding: '8%',
    [breakpoints.up('lg')]: {
      height: '65vh',
      paddingBottom: '2em',
    },
  },
  // backdropWrapper: {
  //   // fontWeight: 'bold',
  //   padding: '8%',
  // },
  backdropSloganContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    // margin: 'auto',
    // top: 0,
    [breakpoints.up('lg')]: {
      maxWidth: '40%',
    },
  },
  backdropImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    margin: 'auto',
    filter: 'opacity(0.4)',
    zIndex: -1,
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
    // paddingTop: '10em',
    // [breakpoints.up('lg')]: {
    //   paddingTop: '10em',
    // },
  },
  buttonSubmit: {
    paddingTop: '10px',
  },
  textField: {
    [breakpoints.up('lg')]: {
      width: '30%',
      paddingRight: '1.5em',
    },
  },
  buttonNew: {
    [breakpoints.up('lg')]: {
      width: '8%',
    },
  },
  sendIcon: {
    paddingLeft: '0.5em',
  },
});
