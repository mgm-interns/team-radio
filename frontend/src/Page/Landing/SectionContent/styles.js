export default ({ palette, breakpoints }) => ({
  container: {
    zIndex: 10,
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    alignTtems: 'center',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
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
  },
  textDescription: {
    marginBottom: '1em',
    color: '#808080',
  },
});
