export default ({ breakpoints, palette }) => ({
  coverContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: palette.darkGreen['500'],
  },
  coverWrapper: {
    margin: 'auto',
    // padding: '0 !important',
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
    margin: 10,
  },
  bigAvatar: {
    width: 150,
    height: 150,
  },
  text: {
    color: 'white',
  },
  number: {
    color: palette.primary['500'],
  },
  buttonCover: {
    color: 'white',
    backgroundColor: palette.primary['500'],
  },
  icon: {
    paddingRight: 10,
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
