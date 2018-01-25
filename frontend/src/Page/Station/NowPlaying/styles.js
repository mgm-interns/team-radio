export default ({ palette, spacing, typography }) => ({
  container: {
    position: 'relative',
  },
  marquee: {
    ...typography.body1,
    position: 'absolute',
    top: spacing.baseMargin,
    left: spacing.baseMargin,
    width: `calc(100% - ${spacing.doubleBaseMargin * 2}px)`,
    padding: spacing.baseMargin,
    backgroundColor: palette.lightBlack,
    color: palette.white,
  },
  skipNotificationContainer: {
    margin: 'auto',
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.0225)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  skipNotificationBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  skipNotificationText: {
    zIndex: 1,
    color: palette.white,
  },
  skipNotificationIcon: {
    zIndex: 1,
    color: palette.white,
    fontSize: 64,
    marginBottom: spacing.doubleBaseMargin,
  },
});
