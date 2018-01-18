export default ({ palette, spacing }) => ({
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
