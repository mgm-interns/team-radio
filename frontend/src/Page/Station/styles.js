export default ({ breakpoints, palette, spacing }) => ({
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
  },
  switcherContainer: {
    margin: 'auto',
    padding: '0 !important',
    marginTop: 56,
    background: palette.lightGrey['500'],
    marginBottom: 20,
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
    marginLeft: spacing.baseMargin,
    flexDirection: 'row',
  },
  nowPlaying: {},
  playlistHeader: {
    padding: spacing.baseMargin,
  },
  playlistMenuItem: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  emptyNowPlayingImage: {
    width: '100%',
  },
  emptyNowPlaying: {
    height: 0,
  },
  emptyPlaylist: {
    height: 0,
  },
  switchedTitle: {
    color: palette.primary['500'],
  },
  tabLabel: {
    fontSize: '1.425rem',
    fontFamily: 'Lato',
    color: 'rgba(0,0,0,0.54)',
    textTransform: 'none',
  },
  onlineCountContainer: {
    display: 'inline-block',
    marginTop: 12,
    marginLeft: spacing.baseMargin,
  },
  onlineIcon: {
    display: 'inline-block',
    fontSize: '1em',
    marginLeft: spacing.baseMargin,
    marginRight: spacing.baseMargin,
    marginBottom: 2,
    color: palette.green.A700,
  },
  stationOnlineCountText: {
    display: 'inline-block',
    fontSize: '1em',
  },
  titleContainer: {
    display: 'flex',
  },
});
