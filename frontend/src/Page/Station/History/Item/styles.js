export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    height: 80,
    width: '100%',
    '&.playing': {
      background: palette.lightGrey['500'],
    },
  },
  thumbnail: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
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
    position: 'relative',
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
    border: '1px solid #ccc',
    borderRadius: '50%',
    objectFit: 'contain',
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
});
