export default ({ breakpoints, palette, spacing, transitions }) => ({
  container: {
    display: 'flex',
    width: 400,
    maxWidth: '90vw',
    '& *': {
      color: palette.white,
    },
  },
  img: {
    display: 'block',
    height: 40,
  },
  rightSection: {
    paddingLeft: spacing.doubleBaseMargin * 2,
  },
  actionButton: {
    color: palette.white,
  },
});
