export default ({ palette, breakpoints }) => ({
  container: {
    background: palette.primary['500'],
    zIndex: '9999',
    height: '80px',
    margin: '0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  img: {
    height: '40px',
  },
  logoName: {
    fontFamily: 'Bebas Neue',
    fontSize: '25pt',
    color: 'white',
    textDecoration: 'none',
    [breakpoints.up('lg')]: {
      fontSize: '34pt',
    },
  },
  navigationContainer: {
    justifyContent: 'flex-end',
  },
  wrapper: {
    '& a': {
      textDecoration: 'none',
      color: 'white',
      fontSize: '20pt',
      fontFamily: 'Bebas Neue',
    },
  },
  text: {
    // textDecoration: 'none',
    fontZize: '20pt',
    color: 'white',
    [breakpoints.up('lg')]: {
      fontSize: '18pt',
    },
  },
});
