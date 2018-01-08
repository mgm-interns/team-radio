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
  switcherContent: {
    width: '100%',
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  content: {
    height: 300,
    [breakpoints.up('md')]: {
      height: 600,
    },
  },
  nowPlayingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  nowPlayingActions: {
    display: 'flex',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  nowPlaying: {},
  emptyNowPlayingImage: {
    width: '100%',
  },
  emptyNowPlaying: {
    height: 0,
  },
  emptyPlaylist: {
    height: 0,
  },
});
