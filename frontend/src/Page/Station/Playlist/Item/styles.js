export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    height: 80,
    width: '100%',
    position: 'relative',
    '&.playing': {
      background: palette.lightGrey['500'],
    },
  },
  thumbnail: {},
  img: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  info: {
    padding: spacing.baseMargin,
  },
  name: {
    ...typography.body2,
    fontSize: '0.825em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    cursor: 'default',
  },
  duration: {
    ...typography.body2,
    fontSize: '0.725em',
    display: 'flex',
    alignItems: 'center',
  },
  durationIcon: {
    color: palette.lightBlack,
    fontSize: spacing.doubleBaseMargin,
  },
  durationText: {
    color: 'rgba(0,0,0,0.54)',
    marginLeft: spacing.smallMargin,
  },
  creator: {
    ...typography.caption,
    position: 'absolute',
    bottom: spacing.baseMargin,
    fontSize: '0.725em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  creatorAvatar: {
    marginLeft: spacing.baseMargin,
    width: '1.6em',
    height: '1.6em',
    border: '1px solid #ccc',
    borderRadius: '50%',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  actions: {
    position: 'absolute',
    right: spacing.baseMargin,
    bottom: spacing.baseMargin,
  },
  actionsWrapper: {
    display: 'flex',
    textAlign: 'center',
    alignSelf: 'center',
  },
  action: {
    fontSize: spacing.baseMargin * 2,
    width: 24,
    height: 24,
  },
  score: {
    ...typography.body2,
    textAlign: 'left',
    margin: 'auto',
    marginLeft: spacing.baseMargin,
    width: spacing.baseMargin * 3,
    fontSize: '0.925em',
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
  scoreRatio: {
    width: '100%',
  },
  progressBar: {
    height: 2,
  },
});
