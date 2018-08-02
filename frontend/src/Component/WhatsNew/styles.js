export default ({ palette, breakpoints, spacing }) => ({
  container: {
    cursor: 'pointer',
    marginRight: spacing.doubleBaseMargin,
    '& span': {
      color: palette.white,
    },
  },
  listContainer: {
    maxWidth: '40vw',
    width: 500,
    minWidth: 250,
    maxHeight: '80vh',
  },
  avatar: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  linkIcon: {
    color: 'inherit',
  },
});
