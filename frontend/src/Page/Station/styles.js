export default ({ typography, breakpoints, palette }) => ({
  containerWrapper: {
    width: '100%',
    margin: 0,
    paddingBottom: 50, // Footer height
  },
  container: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
    '& h1': {
      ...typography.display1,
      color: 'black',
    },
  },
  switcherContainer: {
    margin: 'auto',
    padding: '0 !important',
    marginTop: 85,
    background: palette.lightGrey['500'],
  },
  content: {
    height: 300,
    [breakpoints.up('md')]: {
      height: 600,
    },
  },
  nowPlaying: {},
});
