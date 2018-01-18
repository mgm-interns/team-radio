export default ({ breakpoints, palette, spacing, typography }) => ({
  logo: {
    height: 35,
    margin: spacing.doubleBaseMargin,
  },
  passiveContainer: {
    width: '100%',
    height: '100vh',
    background: 'rgba(0,0,0,0.99)',
    zIndex: '1000',
    position: 'fixed',
  },
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
  playerContainer: {
    transition: 'all 0.3s linear',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1001',
    width: '100%',
    padding: `${spacing.doubleBaseMargin}px !important`,
  },
  nowPlayingContainer: {
    width: '100%',
    margin: 0,
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
    height: '100%',
  },
  nowPlayingActions: {
    display: 'flex',
    marginLeft: spacing.baseMargin,
    flexDirection: 'row',
  },
  nowPlaying: {
    height: '60vh',
  },
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
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  nowPlayingInfo: {
    color: 'white',
    lineHeight: 1.8,
  },
  passiveStationMainColor: {
    color: palette.lightGrey.A700,
  },
  loadingTitle: {
    width: `${typography.display1.fontSize} !important`,
    height: `${typography.display1.fontSize} !important`,
    color: typography.display1.color,
  },
  tabs: {
    borderBottom: '1px solid #f2f2f2',
  },
});
