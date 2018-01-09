export default ({ breakpoints, spacing, palette }) => ({
  container: {
    margin: 'auto',
    overflowX: 'auto',
    minHeight: 120,
    [breakpoints.up('md')]: {
      minHeight: 130,
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
    display: 'flex',
    flexFlow: 'column-reverse',
    width: 90,
    height: 90,
    backgroundSize: 'cover',
  },
  stationOnlineCountWrapper: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.56)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.smallMargin / 2,
    paddingBottom: spacing.smallMargin / 2,
  },
  onlineIcon: {
    fontSize: 10,
    marginLeft: spacing.baseMargin,
    marginRight: spacing.baseMargin,
    color: palette.white,
    '&.active': {
      color: palette.green.A700,
    },
  },
  stationOnlineCountText: {
    fontSize: '0.625em',
    color: palette.white,
  },
  stationInfo: {
    width: 90,
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
