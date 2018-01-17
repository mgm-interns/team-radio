export default ({ breakpoints, spacing }) => ({
  containerWrapper: {
    width: spacing.fullWidth,
    margin: 0,
    [breakpoints.up('lg')]: {
      paddingBottom: 100, // Footer height
    },
  },
  switcherContainer: {
    margin: 'auto',
    padding: '0 !important',
  },
  switcherContent: {
    width: spacing.fullWidth,
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  titleLabel: {
    paddingLeft: 32,
  },
});
