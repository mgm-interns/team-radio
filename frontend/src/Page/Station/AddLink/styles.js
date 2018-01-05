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

    sendBtn: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },

    sendIcon: {
      marginLeft: baseMargin,
      fontSize: doubleBaseMargin,
    },

    addLinkBoxRight: {
      paddingLeft: '30px !important',
      [breakpoints.down('md')]: {
        paddingLeft: '8px !important',
      },
    },

    previewRightContainer: {
      position: 'relative',
    },

    previewTitle: {
      ...typography.title,
      marginBottom: baseMargin,
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
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
      // width: 200,
      height: 200,
      margin: 'auto',
    },

    emptyImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
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
    searchItemImg: {
      height: '100%',
      marginRight: baseMargin,
    },
    /* End search */
  };
};
