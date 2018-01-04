export default theme => ({
  containerWrapper: {
    width: '100%',
    margin: 0,
    paddingBottom: 50, // Footer height
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
  nowPlaying: {
    padding: '0 0 0 8px !important',
  },
});
