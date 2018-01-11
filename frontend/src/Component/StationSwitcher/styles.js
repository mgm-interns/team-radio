export default ({ breakpoints, spacing, palette }) => ({
  container: {
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
    // height: calc(100vh - 7.4rem) !important;
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
    padding: spacing.doubleBaseMargin,
    flexDirection: 'column',
    alignItems: 'left',
    cursor: 'pointer',
  },
  stationTitle: {
    marginTop: spacing.baseMargin,
    fontSize: '1em',
    textAlign: 'left',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  stationSubtitle: {
    color: 'grey',
    fontSize: '0.75em',
  },
  stationAvatar: {
    display: 'flex',
    flexFlow: 'column-reverse',
    width: 150,
    height: 150,
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
    width: 150,
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
      fontSize: '0.75em',
      marginTop: spacing.smallMargin,
    },
    stationSubtitle: {
      color: 'grey',
      fontSize: '0.65em',
    },
  },
});
