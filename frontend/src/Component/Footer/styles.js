export default ({ breakpoints, palette }) => ({
  container: {
    width: '100%',
    margin: 'auto',
    fontFamily: 'Lato',
    height: '50px',
    background: palette.primary['500'],
  },
  wrapper: {
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
  copyright: {
    // borderTop: '1px solid #808080',
  },
  copyrightText: {
    color: palette.white,
    fontSize: '0.8rem',
  },
});
