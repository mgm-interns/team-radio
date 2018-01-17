export default ({ palette, spacing }) => ({
  avatarContainer: {
    position: 'relative',
    margin: 10,
    '& .hoverButton': {
      display: 'none',
      color: palette.white,
    },
    '&:hover .hoverButton': {
      cursor: 'pointer',
      width: spacing.fullWidth,
      height: spacing.fullHeight,
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      borderRadius: 150,
    },
  },

  modalContainer: {
    margin: 'auto',

    minWidth: 500,
    maxWidth: 1024,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
  },
  loadingBackdrop: {
    position: 'absolute',
    width: spacing.fullWidth,
    height: spacing.fullHeight,
    top: 0,
    left: 0,
    display: 'flex',
    background: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    color: palette.white,
    width: 100,
    height: 100,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  button: {
    color: palette.white,
    backgroundColor: palette.primary['500'],
  },
  cardActions: {
    flexDirection: 'column',
  },
  cardHeader: {
    flexDirection: 'column',
  },
});
