export default ({ breakpoints, palette, spacing }) => ({
  coverContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: 'black',
    // height: '36vh',
    width: spacing.fullViewportWidth,
    overflowX: 'hidden',
    [breakpoints.down('sm')]: {
      height: '350px',
    },
    [breakpoints.up('md')]: {
      height: '300px',
    },
    zIndex: 0,
  },
  coverWrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  backgroundImg: {
    margin: 'auto',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: spacing.fullViewportWidth,
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      height: '350px',
    },
    [breakpoints.up('md')]: {
      height: '300px',
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
    zIndex: 1,
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
    zIndex: 1,
    [breakpoints.down('sm')]: {
      padding: 20,
    },
  },
  userInformation: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },
  changeCoverActionWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1,
    [breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
});
