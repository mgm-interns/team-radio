export default ({ breakpoints, palette }) => ({
  containerWrapper: {
    width: '100%',
    margin: 0,
    [breakpoints.up('lg')]: {
      paddingBottom: 100, // Footer height
    },
  },
  switcherContainer: {
    margin: 'auto',
    padding: '0 !important',
    background: palette.lightGrey['200'],
  },
  switcherContent: {
    width: '100%',
    margin: 'auto',
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
    },
  },
});
