export default ({ breakpoints }) => ({
  container: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  actions: {
    display: 'flex',
    borderBottom: '1px solid #f2f2f2',
    padding: '0px !important',
  },
  buttonEditProfile: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tabLabel: {
    fontStyle: 'bold',
    textTransform: 'none',
  },
});
