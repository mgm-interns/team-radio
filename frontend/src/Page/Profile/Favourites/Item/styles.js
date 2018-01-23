export default ({ spacing, palette, typography }) => ({
  container: {
    padding: '0 15px 15px',
    maxWidth: 200,
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
    // display: 'flex',
    display: 'inline',
    flexDirection: 'inherit',
  },
  name: {
    ...typography.body2,
    fontSize: '0.9em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    cursor: 'default',
    marginTop: -4,
    color: 'rgba(0, 0, 0, 0.54)',
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
    position: 'absolute',
    right: 0,
    bottom: -15,
  },
});
