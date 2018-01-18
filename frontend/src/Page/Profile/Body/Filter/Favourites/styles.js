export default ({ breakpoints, spacing }) => ({
  containerWrapper: {
    width: spacing.fullWidth,
    margin: 0,
    [breakpoints.up('lg')]: {
      paddingBottom: 100, // Footer height
    },
  },
  favouritesContainer: {
    margin: 'auto',
    padding: '0 !important',
  },
});
