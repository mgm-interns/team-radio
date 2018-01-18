export default ({ spacing, palette, typography }) => ({
  thumbnail: {
    width: 210,
    height: 118,
  },
  img: {
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  info: {
    paddingLeft: spacing.doubleBaseMargin,
    paddingRight: spacing.doubleBaseMargin * 2,
    paddingBottom: spacing.doubleBaseMargin,
    position: 'relative',
  },
  name: {
    ...typography.body2,
    fontSize: '0.825em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.725em',
  },
  durationText: {
    color: 'rgba(0,0,0,0.54)',
    marginLeft: spacing.smallMargin,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: spacing.doubleBaseMargin * 3,
  },
});
