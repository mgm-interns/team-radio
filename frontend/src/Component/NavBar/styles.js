export default ({ palette, breakpoints }) => ({
  container: {
    margin: 'auto',
    backgroundColor: palette.primary['500'],
    // backgroundColor: 'rgba(10, 55, 58, 0.4) !important',
    zIndex: '3',
    height: 80,
    width: '100vw',
    position: 'fixed',
    fontFamily: 'Lato',
  },
  wrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    height: '2em',
  },
  logoName: {
    fontSize: '1rem',
    color: 'white',
    textDecoration: 'none',
  },
  navContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  navWrapper: {
    '& a': {
      textDecoration: 'none',
      color: 'white',
      fontSize: '1rem',
    },
  },
});
