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
    marginTop: 70,
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
  },
  nowPlayingActions: {
    display: 'flex',
    marginLeft: spacing.baseMargin,
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
  nowPlayingSuggestion: {
    margin: 'auto',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.0225)',
  },
  suggestionText: {
    color: palette.lightBlack,
  },
  suggestionIcon: {
    color: palette.lightBlack,
    fontSize: 64,
  },
});
