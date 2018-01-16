export default theme => {
  // console.log(theme);
  const {
    spacing: { baseMargin, doubleBaseMargin },
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
      width: '100%',
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
      width: '100%',
      height: '100%',
    },

    loadingContainer: {
      height: '100%',
      minHeight: 158,
    },

    emptyCollection: {
      width: '100%',
      height: 200,
      margin: 'auto',
    },

    emptyImg: {
      width: '100%',
      height: '100%',
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
      width: '100%',
    },
    input: {
      paddingRight: 50,
    },
    searchItemImg: {
      height: '100%',
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
