export default ({ spacing, palette, typography }) => ({
  onlineCountContainer: {
    marginLeft: spacing.baseMargin,
    cursor: 'pointer',
    position: 'relative',
  },
  onlineIcon: {
    display: 'inline-block',
    fontSize: '1em',
    marginLeft: spacing.baseMargin,
    marginRight: spacing.baseMargin,
    marginBottom: 2,
    color: palette.green.A700,
  },
  stationOnlineCountText: {
    display: 'inline-block',
    fontSize: '1em',
  },
  listItem: {},
  activeListItem: {
    background: palette.primary['500'],
    '&:hover': {
      background: palette.primary['600'],
    },
    '& h3': {
      color: palette.white,
    },
  },
  userAvatar: {
    width: 30,
    height: 30,
    '& img': {
      borderRadius: '50%',
    },
  },
  anonymousImage: {
    ...typography.display,
    margin: 0,
    borderRadius: '50%',
    fontSize: '.725em',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: palette.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: spacing.baseMargin,
    borderRadius: spacing.smallMargin,
  },
  tooltipItem: {
    fontSize: '0.625em',
    color: palette.white,
  },
});
