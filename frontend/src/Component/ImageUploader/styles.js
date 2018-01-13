export default ({ palette }) => ({
  avatarContainer: {
    position: 'relative',
    margin: 10,
    '& .hoverButton': {
      display: 'none',
      color: '#fff',
    },
    '&:hover .hoverButton': {
      cursor: 'pointer',
      width: '100%',
      height: '100%',
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
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    background: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    color: 'white',
    width: 100,
    height: 100,
  },
  avatar: {
    width: 150,
    height: 150,
  },
  button: {
    color: 'white',
    backgroundColor: palette.primary['500'],
  },
  cardActions: {
    flexDirection: 'column',
  },
  cardHeader: {
    flexDirection: 'column',
  },
});
