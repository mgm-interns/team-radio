export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    height: 80,
    width: spacing.fullWidth,
    position: 'relative',
    '&.playing': {
      background: palette.lightGrey['500'],
    },
    '& .hiddenAction': {
      display: 'none',
    },
    '&:hover .hiddenAction': {
      display: 'flex',
    },
  },
  thumbnail: {
    position: 'relative',
  },
  img: {
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  duration: {
    position: 'absolute',
    bottom: spacing.baseMargin + spacing.smallMargin / 2,
    right: spacing.baseMargin + spacing.smallMargin / 2,
    display: 'flex',
    alignItems: 'center',
    padding: spacing.smallMargin / 2,
    borderRadius: 2,
    backgroundColor: palette.lightBlack,
  },
  durationText: {
    ...typography.body2,
    color: palette.white,
    fontSize: '0.625em',
    marginLeft: spacing.smallMargin,
    marginRight: spacing.smallMargin,
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
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  actions: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  action: {
    width: spacing.baseMargin * 5,
    height: spacing.baseMargin * 5,
    '& .material-icons': {
      fontSize: spacing.baseMargin * 3,
    },
  },
  favouriteWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
  },
  favouriteBtn: {
    fontSize: spacing.doubleBaseMargin * 1.5,
    width: spacing.doubleBaseMargin * 2.5,
    height: spacing.doubleBaseMargin * 2.5,
  },
});
