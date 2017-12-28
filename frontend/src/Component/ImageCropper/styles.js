export default ({ breakpoints }) => ({
  modalContainer: {
    margin: 'auto',
    minWidth: 768,
    maxWidth: 1024,
  },
  modalContent: {
    position: 'relative',
  },
  cropper: {
    minWidth: 512,
    maxWidth: 768,
    minHeight: 312,
    maxHeight: 512,
  },
  rightContainerImage: {
    width: '100%',
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
  button: {
    width: '100%',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
