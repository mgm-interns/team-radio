export default ({ palette, breakpoints, spacing }) => ({
  container: {
    zIndex: 10,
    width: spacing.fullWidth,
    paddingBottom: 50,
  },
  containerLight: {
    marginTop: 50,
    paddingTop: 80,
    paddingBottom: 80,
    background: '#f4f0ea',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
    margin: 0,
  },
  textContent: {
    paddingTop: '2em',
    padding: '2em 4em',
  },
  textTitle: {
    textAlign: 'left',
    fontSize: '30pt',
    paddingBottom: '0.5em',
  },
  imageBlock: {
    paddingTop: '-15em',
  },
  button: {
    color: palette.primary['500'],
    cursor: 'pointer',
  },
  textDescription: {
    marginBottom: '1em',
    color: '#808080',
  },
});
