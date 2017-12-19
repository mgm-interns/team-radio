export default ({ palette }) => ({
  backdropContainer: {
    position: 'relative',
    margin: 'auto',
    padding: 'auto',
  },
  backdropForeground: {
    background: palette.darkGreen['500'],
    height: '40vh',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  backdropWrapper: {
    fontWeight: 'bold',
  },
  backdropImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    margin: 'auto',
    filter: 'opacity(0.4)',
    zIndex: -1,
  },
  backdropSlogan: {
    fontSize: '20pt',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
  },
  formInput: {
    margin: 'auto',
    zIndex: 2,
    textAlign: 'center',
  },
  buttonSubmit: {
    paddingTop: '10px',
  },
});
