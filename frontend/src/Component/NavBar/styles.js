export default ({ palette, breakpoints }) => ({
  container: {
    background: palette.primary['500'],
    zIndex: '9999',
    height: '80px',
    margin: '0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
      fontSize: '25pt',
      fontFamily: 'Bebas Neue',
    },
  },
  text: {
    // fontZize: '25pt',
    color: 'white',
    [breakpoints.up('lg')]: {
      fontSize: '18pt',
    },
  },
});
