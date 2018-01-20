export default ({ breakpoints, palette, spacing }) => ({
  coverContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: palette.darkGreen['500'],
    height: '28vh',
  },
  coverWrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
    zIndex: 2,
  },
  backgroundImg: {
    position: 'absolute',
    zIndex: 1,
    filter: 'opacity(0.5)',
    width: spacing.fullWidth,
    height: '28vh',
    top: 0,
    left: 0,
    margin: 'auto',
    objectFit: 'cover',
  },
  coverBackground: {
    paddingTop: 56,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInformationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInformationContent: {
    paddingLeft: spacing.doubleBaseMargin,
  },
  avatar: {
    margin: spacing.doubleBaseMargin,
  },
  text: {
    color: palette.white,
  },
  number: {
    color: palette.primary['500'],
  },
  icon: {
    // '& :hover': {
    //   color: 'lightgray',
    // },
  },
  summarize: {
    display: 'flex',
    alignItems: 'center',
  },
  summarizeItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 50,
  },
  userInformation: {
    display: 'flex',
    alignItems: 'center',
  },
  changeCoverActionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
