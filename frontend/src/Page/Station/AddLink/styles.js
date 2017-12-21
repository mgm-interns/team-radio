export default theme => {
  // console.log(theme.typography.title);
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
      minHeight: 155,
    },
  };
};
