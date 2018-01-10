export default () => ({
  avatar: {
    position: 'relative',
    '& .hoverButton': {
      display: 'none',
      color: '#fff',
    },
    '&:hover .hoverButton': {
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      position: 'absolute',
      content: ' ',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
});
