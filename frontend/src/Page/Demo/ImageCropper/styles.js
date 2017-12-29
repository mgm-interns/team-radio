export default theme => ({
  container: {
    margin: 'auto',
    paddingTop: 60,
    paddingBottom: 60,
    width: '100%',
  },
  secondButton: {
    position: 'relative',
    '& .backdrop': {
      display: 'none',
    },
    '&:hover > .backdrop': {
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      position: 'absolute',
      content: ' ',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
    },
  },
  backdropIcon: {
    margin: 'auto',
    color: 'white',
    fontSize: 72,
  },
});
