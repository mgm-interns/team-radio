export default ({ breakpoints, palette, spacing, typography }) => ({
  chatboxContainer: {
    margin: 0,
    width: '100%',
    height: '100%',
  },

  chatboxHeader: {
    padding: '0 !important',
  },

  chatboxNavbar: {
    background: 'rgb(224, 106, 78)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 8,
    color: 'white',
  },

  chatboxTitleContainer: {
    display: 'flex',
  },

  chatboxTitle: {
    fontWeight: 'bold',
    marginLeft: 8,
  },

  stationName: {
    fontStyle: 'italic',
  },

  collapseContainer: {
    width: '100%',
  },

  collapseDownBtn: {
    width: 20,
    height: 20,
    marginLeft: 10,
    color: 'white',
  },

  chatboxBody: {
    height: '100%',
    background: '#fff9f9',
    position: 'relative',
    padding: '0 !important',
  },

  messageInputContainer: {
    background: '#fff9f9',
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
    marginLeft: 8,
  },

  messages: {
    borderRadius: 8,
    padding: '8px 16px',
    fontSize: 14,
  },

  otherMessagesBackground: {
    background: '#f4d0d0',
  },

  currentUserMessageBackground: {
    background: '#ffe8e8',
  },
});
