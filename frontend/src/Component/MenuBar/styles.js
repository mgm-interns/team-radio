export default ({ palette, spacing }) => ({
  container: {
    height: 30,
    backgroundColor: palette.primary['800'],
    '-webkit-user-select': 'none',
  },
  draggable: {
    width: '100%',
    height: 36,
    '-webkit-app-region': 'drag',
  },
  toolbar: {
    minHeight: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  contentWrapper: {
    padding: '0 !important',
  },
  content: {
    margin: 0,
  },
  contentContainer: {
    margin: 0,
    flexWrap: 'nowrap',
  },
  rightContainer: {
    width: 150,
    paddingRight: spacing.doubleBaseMargin,
    '& button': {
      height: '100%',
    },
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
