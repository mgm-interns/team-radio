export default ({ palette, breakpoints }) =>
  // console.log(theme),
  ({
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
      justifyContent: 'space-around',
      // maxWidth: '30%',
      [breakpoints.up('lg')]: {
        maxWidth: '40%',
      },
    },
    text: {
      color: 'white',
      textDecoration: 'none',
      fontSize: 'large',
      [breakpoints.up('lg')]: {
        fontSize: '18pt',
      },
    },
  });
