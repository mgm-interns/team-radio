export default theme => ({
  container: {
    margin: 'auto',
    paddingTop: `12px !important`,
    // width: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingTop: `36px !important`,
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  switcherContainer: {
    margin: 'auto',
    // width: '100%',
    background: theme.palette.lightGrey['500'],
    // paddingTop: '80px',
  },
  content: {
    height: 300,
    [theme.breakpoints.up('md')]: {
      height: 600,
    },
  },
});
