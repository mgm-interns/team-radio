export default ({ breakpoints, palette, spacing, transitions }) => ({
  container: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  actions: {
    display: 'flex',
  },
  buttonEditProfile: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
