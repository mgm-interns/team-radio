export default theme => {
  const {
    spacing: {
      smallMargin,
      baseMargin,
      doubleBaseMargin,
      fullWidth,
      fullHeight,
    },
    palette: { yellow },
    typography,
    breakpoints,
  } = theme;
  return {
    addLinkContainer: {
      marginTop: doubleBaseMargin,
    },
    linkTitle: {
      marginBottom: doubleBaseMargin,
    },
    durationText: {
      ...typography.caption,
      fontSize: '0.9em',
      marginLeft: baseMargin,
    },
    primaryText: {
      display: 'inline',
    },
    secondaryText: {
      color: 'rgba(0,0,0,0.54)',
    },
    channelName: {
      marginLeft: 'auto',
      fontSize: '0.9em',
    },
    warningText: {
      color: yellow[900],
    },
    addLinkBox: {
      backgroundColor: '#fafafa !important',
      marginLeft: baseMargin,
      marginRight: baseMargin,
      marginTop: 0,
      marginBottom: doubleBaseMargin * 3,
      width: fullWidth,
      padding: doubleBaseMargin,
      boxShadow: '0 0 10px -3px rgba(0, 0, 0, 0.5) !important',
    },
    addLinkBoxLeft: {
      textAlign: 'end',
    },
    gridContainer: {
      padding: baseMargin,
    },
    linkInput: {
      maxHeight: 100,
      marginBottom: baseMargin,
    },
    addLinkBoxRight: {
      paddingLeft: '30px !important',
      [breakpoints.down('md')]: {
        paddingLeft: '8px !important',
      },
    },
    previewRightContainer: {
      position: 'relative',
      lineHeight: 1.8,
    },
    previewTitle: {
      ...typography.title,
      marginBottom: baseMargin,
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },
    volume: {
      position: 'absolute',
      left: 0,
      bottom: 0,
    },
    sendBtn: {
      position: 'absolute',
      right: baseMargin,
      bottom: baseMargin,
    },
    sendIcon: {
      marginLeft: baseMargin,
      marginBottom: smallMargin - 1,
      fontSize: doubleBaseMargin,
    },
    content: {
      margin: 0,
      width: fullWidth,
      height: 230,
    },
    loadingContainer: {
      height: fullHeight,
      minHeight: 158,
    },
    emptyCollection: {
      width: fullWidth,
      height: 230,
      margin: 'auto',
    },
    emptyImg: {
      width: fullWidth,
      height: fullHeight,
      objectFit: 'contain',
    },
    notFound: {
      width: '40%',
    },
    messageInput: {
      marginTop: baseMargin,
    },

    /* Search */
    autoSearchContainer: {
      flexGrow: 1,
      position: 'relative',
    },
    suggestionsContainerOpen: {
      position: 'absolute',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 3,
      left: 0,
      right: 0,
      zIndex: 9999,
      maxHeight: 240,
      overflowY: 'auto',
    },
    suggestion: {
      display: 'block',
    },
    suggestionsList: {
      margin: 0,
      padding: 0,
      listStyleType: 'none',
    },
    textField: {
      width: fullWidth,
    },
    input: {
      paddingRight: 50,
    },
    searchItemImg: {
      height: fullHeight,
      marginRight: baseMargin,
    },
    closeIcon: {
      position: 'absolute',
      top: '-25%',
      right: 0,
    },
    durationContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: smallMargin,
    },
    /* End search */
  };
};
