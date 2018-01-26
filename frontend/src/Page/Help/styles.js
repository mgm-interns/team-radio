export default ({ breakpoints, palette, spacing }) => ({
  container: {
    margin: 'auto',
    width: '100%',
    overflowX: 'hidden',
    paddingBottom: 150,
  },
  coverContainer: {
    margin: 'auto',
    // padding: '0 !important',
    width: '100%',
    overflowX: 'hidden',
    [breakpoints.down('sm')]: {
      height: '350px',
    },
    [breakpoints.up('md')]: {
      height: '300px',
    },
  },
  coverWrapper: {
    margin: 'auto',
    // width: spacing.fullViewportWidth,
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  wrapper: {
    margin: 'auto',
    // paddingTop: 80,
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
    // override index.css with custom markdown :))
    '& *': {
      margin: '20px 10px 10px 10px',
      padding: '0px 0px 0 10px',
    },
    '& ul': {
      marginLeft: 20,
    },
  },
  backgroundImg: {
    margin: 'auto',
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      height: '350px',
    },
    [breakpoints.up('md')]: {
      height: '300px',
    },
  },
  markdownWrapper: {
    height: spacing.fullViewportHeight,
  },
});
