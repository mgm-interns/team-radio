export default ({ palette, breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    width: spacing.fullViewportWidth,
    background: palette.darkGreen['500'],
    [breakpoints.down('sm')]: {
      height: '105vh',
    },
  },
  foreground: {
    height: spacing.fullViewportHeight,
    width: spacing.fullWidth,
    zIndex: 0,
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  backgroundImg: {
    position: 'absolute',
    width: spacing.fullViewportWidth,
    height: spacing.fullViewportHeight,
    top: 0,
    left: 0,
    margin: 'auto',
    filter: 'opacity(0.6)',
    zIndex: -1,
    objectFit: 'cover',
    [breakpoints.down('sm')]: {
      height: '105vh',
    },
  },
  cardWrapper: {
    margin: 'auto',
  },
  cardInfoWrapper: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cardInfo: {
    background: 'none',
    boxShadow: 'none',
  },
  textField: {
    width: spacing.fullWidth,
  },
  cardForm: {
    padding: '2em',
    [breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  error: {
    color: '#ff1744',
    fontWeight: 'bold',
    marginTop: 0,
    minHeight: 0,
  },
  buttonSend: {
    width: spacing.fullWidth,
  },
  cardActionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: palette.primary['500'],
  },
});
