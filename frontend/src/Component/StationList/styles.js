export default ({ breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
  },
  content: {
    display: 'flex',
    float: 'left',
    paddingBottom: 8,
    minHeight: 110,
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
    position: 'relative',
  },
  loadingAvatar: {
    background: 'rgba(0,0,0,0.075)',
  },
  loadingInfo: {
    background: 'rgba(0,0,0,0.075)',
    width: spacing.fullWidth,
    height: spacing.doubleBaseMargin,
    marginTop: spacing.baseMargin,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
