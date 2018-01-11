export default ({ breakpoints, spacing, palette }) => ({
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
    backgroundPosition: 'center',
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
