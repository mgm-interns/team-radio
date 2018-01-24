export default ({ breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    position: 'relative',
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
  disabledBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    cursor: 'not-allowed',
  },
});
