export default ({ breakpoints, spacing, palette }) => ({
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
    backgroundColor: '#f9f4ef',
  },

  chatList: {
    overflowY: 'auto',
    height: 500,
    [breakpoints.up('md')]: {
      height: 575,
    },
  },

  messageInputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 0,
    background: '#fcf9f7',
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
    display: 'flex',
    padding: `${spacing.smallMargin}px ${spacing.baseMargin}px`,
  },

  userAvatar: {
    width: 40,
    height: 40,
    marginTop: 'auto',
    cursor: 'pointer',
  },

  messageContainer: {
    display: 'flex',
    marginLeft: spacing.baseMargin,
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
    wordBreak: 'break-word',
  },

  otherMessagesBackground: {
    background: 'rgba(255,255,255,1)',
  },

  currentUserMessageBackground: {
    background: 'white',
  },
});
