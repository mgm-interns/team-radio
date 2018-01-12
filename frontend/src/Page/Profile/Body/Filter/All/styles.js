export default ({ breakpoints, spacing }) => ({
  containerWrapper: {
    width: '100%',
    margin: 0,
    [breakpoints.up('lg')]: {
      paddingBottom: 100, // Footer height
    },
  },
  container: {
    margin: 'auto',
    padding: '0 !important',
  },
  stationSection: {
    width: '100% !important',
    margin: 'auto',
  },
  titleLabel: {
    paddingLeft: spacing.doubleBaseMargin,
  },
});
