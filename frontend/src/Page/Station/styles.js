export default theme => ({
  container: {
    margin: 'auto',
    paddingTop: `12px !important`,
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingTop: `36px !important`,
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  switcherContainer: {
    margin: 'auto',
  },
  content: {
    height: 300,
    [theme.breakpoints.up('md')]: {
      height: 600,
    },
  },
});
