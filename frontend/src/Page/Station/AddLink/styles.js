export default theme => {
  // console.log(theme);
  const {
    spacing: { smallMargin, baseMargin, doubleBaseMargin },
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
      marginHorizontal: smallMargin,
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

    previewTitle: {
      ...typography.title,
      marginBottom: baseMargin,
      [breakpoints.down('sm')]: {
        fontSize: '1rem',
      },
    },

    previewImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      padding: '0 4px 0 0',
      [breakpoints.down('md')]: {
        paddingLeft: '0 !important',
      },
      [breakpoints.down('sm')]: {
        width: 'initial',
        height: 'initial',
        objectFit: 'contain',
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
