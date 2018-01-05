export default ({ breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    overflowX: 'auto',
    minHeight: 120,
    [breakpoints.up('lg')]: {
      minHeight: 140,
      paddingLeft: spacing.doubleBaseMargin,
      paddingRight: spacing.doubleBaseMargin,
    },
  },
  scrollArea: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    marginRight: -17,
    marginBottom: -17,
    paddingLeft: spacing.doubleBaseMargin,
    paddingRight: spacing.doubleBaseMargin,
  },
  stationWrapper: {
    display: 'flex !important',
    padding: spacing.baseMargin,
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  stationTitle: {
    marginTop: spacing.smallMargin,
    fontWeight: 'bold',
    fontSize: '0.825em',
    textAlign: 'center',
    display: 'block',
  },
  stationSubtitle: {
    color: 'grey',
    fontSize: '0.75em',
  },
  stationAvatar: {
    width: 90,
    height: 90,
    objectFit: 'cover',
  },
  stationInfo: {
    width: 90,
    marginBottom: spacing.baseMargin,
  },
  activeStation: {
    background: 'white',
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
    height: spacing.doubleBaseMargin,
    marginTop: spacing.baseMargin,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  [breakpoints.down('sm')]: {
    stationAvatar: {
      width: 80,
      height: 80,
    },
    stationInfo: {
      width: 80,
    },
    stationTitle: {
      fontSize: '0.75em',
    },
    stationSubtitle: {
      color: 'grey',
      fontSize: '0.65em',
    },
  },
});
