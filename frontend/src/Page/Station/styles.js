export default theme => ({
  content: {
    height: 300,
    [theme.breakpoints.up('md')]: {
      height: 600,
    },
  },
});
