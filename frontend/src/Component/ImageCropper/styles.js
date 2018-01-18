export default ({ palette, spacing }) => ({
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
    width: spacing.fullWidth,
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
  button: {
    width: spacing.fullWidth,
  },
  buttonIcon: {
    marginRight: 8,
  },
});
