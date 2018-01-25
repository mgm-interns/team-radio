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
  sloganContainer: {
    [breakpoints.down('sm')]: {
      textAlign: 'center',
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
  sloganText: {
    fontSize: '2.5rem',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
    [breakpoints.up('lg')]: {
      fontSize: '3rem',
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
  sendIcon: {
    paddingLeft: '0.5em',
  },

  cardForm: {
    padding: '2em',
    [breakpoints.down('sm')]: {
      padding: '1em',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: '16',
    fontSize: '14',
    color: palette.primary,
  },
  pos: {
    marginBottom: '12',
    color: palette.primary,
  },
  text: {
    color: '#fff !important',
  },
  listWrapper: {
    // paddingLeft: 20,
    fontWeight: 400,
    listStyle: 'none',
    marginTop: 20,
  },
  listItem: {
    color: palette.white,

    padding: 10,
    fontSize: 18,
    [breakpoints.down('sm')]: {
      padding: 0,
      fontSize: 16,
    },
  },
  listText: {
    paddingLeft: 20,
  },
  error: {
    color: '#ff1744',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttonSend: {
    width: spacing.fullWidth,
  },
  callout: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    margin: '20px',
    marginLeft: 0,
    marginRight: 0,
    '& a': {
      marginLeft: '5px',
    },
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  link: {
    color: palette.primary['500'],

    [breakpoints.down('sm')]: {
      paddingTop: spacing.baseMargin,
      paddingBottom: spacing.baseMargin,
    },
  },
  cardActionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
