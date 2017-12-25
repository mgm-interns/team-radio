export default ({ breakpoints }) => ({
  container: {
    width: '100%',
    margin: 'auto',
    fontFamily: 'Lato',
    height: '50px',
  },
  wrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  copyright: {
    borderTop: '1px solid #808080',
  },
  copyrightText: {
    color: '#808080',
    fontSize: '0.8rem',
  },
});
