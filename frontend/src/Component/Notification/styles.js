export default ({ spacing, typography }) => ({
  NotificationItem: {},
  Containers: {
    tr: {
      top: 50,
      right: spacing.baseMargin * -1,
    },
    br: {
      right: spacing.baseMargin * -1,
    },
    tl: {
      top: 50,
      right: spacing.baseMargin,
    },
    bl: {
      right: spacing.baseMargin,
    },
  },
  Title: {
    DefaultStyle: {
      ...typography.body1,
    },
  },
});
