export default ({ palette }) => ({
  container: {
    background: palette.primary['500'],
    zIndex: '9999',
    height: '80px',
    margin: '0',
    // paddingTop: '60px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingLeft: '50px',
  },
  img: {
    // alignSelf: 'center',
    height: '40px',
  },
  logoName: {
    fontFamily: 'Bebas Neue',
  },
  navigationContainer: {
    justifyContent: 'flex-end',
  },
  wrapper: {
    justifyContent: 'space-around',
    // paddingLeft: 0,
  },
  text: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 'large',
  },
});
