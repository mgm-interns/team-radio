export default theme => {
  // console.log(theme);
  const {
    spacing: { smallMargin, baseMargin, doubleBaseMargin },
    palette: { lightGrey },
  } = theme;
  return {
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
      margin: '0 4px 20px 4px',
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
    },

    linkImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      padding: '0 4px 0 0',
    },

    content: {
      margin: 0,
      width: '100%',
      height: '100%',
    },

    loadingContainer: {
      height: '100%',
      minHeight: 156,
    },
  };
};
