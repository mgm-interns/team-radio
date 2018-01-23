export default ({ spacing, palette, typography }) => ({
  container: {
    padding: '0 15px 15px',
  },
  thumbnail: {
    width: 210,
    height: 120,
  },
  img: {
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  info: {
    display: 'flex',
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
    right: 'auto',
    width: 0,
  },
});
