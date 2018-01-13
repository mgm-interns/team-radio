export default ({ breakpoints, spacing }) => ({
  container: {
    display: 'flex',
    paddingBottom: 8,
    margin: 'auto',
    overflowX: 'auto',
    minHeight: 110,
    width: 'auto !important',
    [breakpoints.up('md')]: {
      minHeight: 200,
      paddingLeft: spacing.doubleBaseMargin,
      paddingRight: spacing.doubleBaseMargin,
    },
  },
  stationWrapper: {
    display: 'flex !important',
    padding: spacing.doubleBaseMargin,
    flexDirection: 'column',
    alignItems: 'left',
    cursor: 'pointer',
  },
  stationAvatar: {
    display: 'flex',
    flexFlow: 'column-reverse',
    width: 150,
    height: 150,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  loadingAvatar: {
    background: 'rgba(0,0,0,0.075)',
  },
  loadingInfo: {
    background: 'rgba(0,0,0,0.075)',
    width: '100%',
    height: spacing.doubleBaseMargin,
    marginTop: spacing.baseMargin,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  [breakpoints.down('sm')]: {
    stationWrapper: {
      padding: spacing.baseMargin,
    },
    stationAvatar: {
      width: 80,
      height: 80,
    },
    stationInfo: {
      width: 80,
    },
    stationTitle: {
      marginTop: spacing.smallMargin,
    },
  },
});
