export default ({ spacing, palette }) => ({
  container: {},
  cardContainer: {
    width: spacing.fullWidth,
    margin: 'auto',
  },
  actionsContainer: {
    padding: spacing.baseMargin,
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    margin: 0,
    width: spacing.fullWidth,
  },
  cardHeader: {
    fontSize: '1em',
  },
  input: {
    fontFamily: 'consolas',
    width: spacing.fullWidth,
    fontSize: '0.75em',
  },
  copyIcon: {
    fontSize: 24,
  },
  copyIconWrapper: {
    marginLeft: 'auto',
  },
  facebookIcon: {
    color: '#4867AA',
    fontSize: 32,
  },
  googleIcon: {
    color: '#DD4B3C',
    fontSize: 32,
  },
  twitterIcon: {
    color: '#1DA1F2',
    fontSize: 32,
  },
  passiveStationMainColor: {
    color: palette.lightGrey.A700,
  },
});
