export default theme => {
  const {
    spacing: { baseMargin, doubleBaseMargin, fullWidth, fullHeight },
    palette: { lightGrey },
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

    primaryTitle: {
      display: 'inline',
    },

    secondaryTitle: {
      color: lightGrey[900],
    },

    warningText: {
      color: 'red',
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

    linkInput: {
      maxHeight: 100,
      marginBottom: baseMargin,
    },

    addLinkBoxRight: {
      paddingLeft: '30px !important',
      minHeight: 186,
      [breakpoints.down('md')]: {
        paddingLeft: '8px !important',
      },
    },

    gridContainer: {
      paddingTop: 10,
      paddingLeft: 15,
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
      right: 0,
      bottom: 0,
    },

    sendIcon: {
      marginLeft: baseMargin,
      fontSize: doubleBaseMargin,
    },

    content: {
      margin: 0,
      width: fullWidth,
      height: fullHeight,
    },

    loadingContainer: {
      height: fullHeight,
      minHeight: 158,
    },

    emptyCollection: {
      width: fullWidth,
      height: 200,
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
    /* End search */
  };
};
