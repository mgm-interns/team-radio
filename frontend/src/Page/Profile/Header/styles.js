export default ({ breakpoints, palette, spacing }) => ({
  coverContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: palette.darkGreen['500'],
  },
  coverWrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  coverBackground: {
    paddingTop: 56,
    height: 250,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInformation: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: spacing.doubleBaseMargin,
  },
  bigAvatar: {
    width: 150,
    height: 150,
  },
  text: {
    color: palette.white,
  },
  number: {
    color: palette.primary['500'],
  },
  buttonCover: {
    color: palette.white,
    backgroundColor: palette.primary['500'],
  },
  icon: {
    paddingRight: spacing.baseMargin,
  },
  summarize: {
    paddingLeft: 150,
    display: 'flex',
  },
  summarizeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 50,
  },
});
