export default ({ breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    zIndex: '10',
    width: '100%',
    height: 56,
    position: 'fixed',
    fontFamily: 'Lato',
    transition: 'all 0.3s',
    [breakpoints.down('md')]: {
      background: 'rgba(0,0,0,0.2)',
    },
  },
  wrapper: {
    margin: 0,
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
    height: '2.5em',
  },
  logoName: {
    fontSize: '1.5rem',
    fontFamily: 'Pacifico',
    color: 'white',
    textDecoration: 'none',
  },
  navContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  navWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    marginLeft: spacing.doubleBaseMargin,
    textDecoration: 'none',
    color: 'white',
    fontSize: '1rem',
  },
});
