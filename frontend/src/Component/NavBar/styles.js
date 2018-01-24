export default ({ palette, breakpoints, spacing }) => ({
  container: {
    margin: 0,
    zIndex: '10',
    width: spacing.fullWidth,
    height: 60,
    position: 'fixed',
    top: 0,
    left: 0,
    fontFamily: 'Lato',
    transition: 'all 0.3s',
    [breakpoints.down('md')]: {
      background: 'rgba(0,0,0,0.2)',
    },
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
    height: '2.3em',
  },
  logoName: {
    fontSize: '1.5rem',
    fontFamily: 'Pacifico',
    color: palette.white,
    textDecoration: 'none',
  },
  navContainer: {
    width: spacing.fullWidth,
    justifyContent: 'flex-end',
  },
  navWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    textDecoration: 'none',
    color: palette.white,
    fontSize: '1rem',
  },
});
