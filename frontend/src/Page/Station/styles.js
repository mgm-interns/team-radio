export default theme => ({
  containerWrapper: {
    width: '100%',
    margin: 0,
  },
  container: {
    margin: 'auto',
    // width: '100%',
    [theme.breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
    '& h1': {
      fontWeight: 'normal',
    },
  },
  switcherContainer: {
    margin: 'auto',
    background: theme.palette.lightGrey['500'],
  },
  content: {
    height: 300,
    [theme.breakpoints.up('md')]: {
      height: 600,
    },
  },
});
