export default ({ spacing }) => ({
  modalHeadline: {
    borderBottom: '1px solid #f2f2f2',
    paddingBottom: 9,
    marginBottom: 10,
    paddingLeft: 20,
    fontSize: '1.3em',
  },
  modal: {
    position: 'absolute',
    width: '30vw',
    top: `40%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 32,
  },
  describeRule: {
    paddingLeft: spacing.baseMargin,
    paddingTop: spacing.baseMargin,
  },
});
