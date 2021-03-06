export default ({ palette, breakpoints, spacing }) => ({
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
  navItemWrapper: {
    textDecoration: 'none',
  },
  navItem: {
    marginLeft: '16px',
    color: palette.white,
  },
});
