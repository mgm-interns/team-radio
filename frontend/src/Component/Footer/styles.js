export default ({ breakpoints, palette, spacing }) => ({
  container: {
    width: spacing.fullWidth,
    margin: 'auto',
    fontFamily: 'Lato',
    height: '50px',
    background: palette.primary['500'],
    position: 'absolute',
    bottom: 0,
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
