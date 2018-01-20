export default ({ breakpoints, palette, spacing }) => ({
  coverContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: palette.darkGreen['500'],
    height: '36vh',
    width: spacing.fullViewportWidth,
    overflowX: 'hidden',
    [breakpoints.down('sm')]: {
      height: '80vh',
    },
    [breakpoints.up('sm')]: {
      height: '40vh',
    },
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
    margin: 'auto',
    position: 'absolute',
    zIndex: 1,
    filter: 'opacity(0.5)',
    height: '36vh',
    top: 0,
    left: 0,
    width: spacing.fullWidth,
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      height: '80vh',
      width: spacing.fullViewportWidth,

    },
    [breakpoints.up('sm')]: {
      height: '40vh',
    },
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
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  userInformationContent: {
    paddingLeft: spacing.doubleBaseMargin,
  },
  avatar: {
    margin: spacing.doubleBaseMargin,
  },
  text: {
    display: 'block',
    color: palette.white,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    cursor: 'default',
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
    paddingLeft: 50,
    [breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  userInformation: {
    display: 'flex',
    alignItems: 'center',
  },
  changeCoverActionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
});
