export default ({ palette }) => ({
  container: {
    height: 30,
    backgroundColor: palette.primary['800'],
    '-webkit-app-region': 'drag',
    '-webkit-user-select': 'none',
  },
  toolbar: {
    minHeight: 0,
    paddingRight: 0,
  },
  content: {
    margin: 0,
  },
  rightContainer: {
    marginLeft: 'auto',
  },
  actionButton: {
    color: palette.white,
    width: 18,
    height: 18,
    marginLeft: 12,
    marginRight: 12,
  },
  hideIcon: {
    marginTop: -10,
  },
});
