export default ({ breakpoints }) => ({
  container: {
    margin: 'auto',
    zIndex: '3',
    height: '8vh',
    width: '100%',
    position: 'fixed',
    fontFamily: 'Lato',
    transition: 'top 0.2s ease-in-out',
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
    '& a': {
      textDecoration: 'none',
      color: 'white',
      fontSize: '1rem',
    },
  },
});
