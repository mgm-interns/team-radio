export default ({ palette, breakpoints }) => ({
  container: {
    // margin: 'auto',
    position: 'relative',
    marginTop: '-4.5em',
    zIndex: 10,
    width: '100%',
    // background: palette.darkGreen['500'],
  },
  wrapper: {
    display: 'flex',
    height: '80vh',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  textContent: {
    paddingTop: '15em',
  },
  imageBlock: {
    paddingTop: '-15em',
  },
  button: {
    color: palette.primary['500'],
  },
  lowerMargin: {
    marginBottom: '1em',
  },
});
