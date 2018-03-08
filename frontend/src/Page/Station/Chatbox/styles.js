export default ({ breakpoints, spacing }) => ({
  chatboxContainer: {
    margin: 0,
    width: '100%',
    height: '100%',
    paddingBottom: spacing.doubleBaseMargin,
  },

  chatboxBody: {
    height: '100%',
    position: 'relative',
    padding: `${spacing.baseMargin}px 0 !important`,
    backgroundColor: 'rgba(0,0,0,0.0225)',
  },

  chatList: {
    overflowY: 'auto',
    height: 200,
    [breakpoints.up('md')]: {
      height: 575,
    },
  },

  messageInputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 0,
    borderTop: '1px solid rgb(224, 222, 222)',
  },

  inputStyle: {
    padding: '0 !important',
  },

  messageTextField: {
    padding: 16,
  },

  inputActionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  messageListItem: {
    padding: `${spacing.smallMargin}px ${spacing.baseMargin}px`,
  },

  messageContainer: {
    display: 'flex',
    marginLeft: 16,
    flexDirection: 'column',
  },

  currentUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  username: {
    fontSize: 12,
    opacity: 0.4,
    fontWeight: 'bold',
    marginLeft: spacing.baseMargin,
  },

  messages: {
    border: '1px solid #eee',
    borderRadius: spacing.baseMargin,
    padding: `${spacing.baseMargin}px ${spacing.doubleBaseMargin}px`,
    fontSize: 14,
  },

  otherMessagesBackground: {
    background: 'rgba(255,255,255,1)',
  },

  currentUserMessageBackground: {
    background: 'rgba(255,255,255,0.6)',
  },
});
