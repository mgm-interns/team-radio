export default ({ breakpoints, spacing }) => ({
  containerWrapper: {
    width: spacing.fullWidth,
    margin: 0,
    [breakpoints.up('lg')]: {
      paddingBottom: 100, // Footer height
    },
  },
  container: {
    margin: 'auto',
  },
  stationSection: {
    width: '100% !important',
    margin: 'auto',
    float: 'left',
  },
});
