export default ({ spacing }) => ({
  container: {
    margin: 'auto',
    paddingTop: 60,
    paddingBottom: 60,
    width: spacing.fullWidth,
  },
  secondButton: {
    position: 'relative',
    '& .backdrop': {
      display: 'none',
    },
    '&:hover > .backdrop': {
      cursor: 'pointer',
      width: spacing.fullWidth,
      height: spacing.fullHeight,
      position: 'absolute',
      content: ' ',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
    },
  },
  backdropIcon: {
    margin: 'auto',
    color: 'white',
    fontSize: 72,
  },
});
