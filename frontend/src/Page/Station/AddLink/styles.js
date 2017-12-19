export default theme => {
  console.log(theme);
  return {
    linkTitle: {
      marginBottom: 20,
    },

    primaryTitle: {
      display: 'inline',
    },

    secondaryTitle: {
      color: 'grey',
    },

    addLinkBox: {
      backgroundColor: '#fafafa !important',
      margin: '0 4px 20px 4px',
      width: '100%',
      padding: 20,
      boxShadow: '0 0 10px -3px rgba(0, 0, 0, 0.5) !important',
    },

    addLinkBoxLeft: {
      textAlign: 'end',
    },

    linkInput: {
      maxHeight: 100,
      marginBottom: 10,
    },

    sendIcon: {
      marginLeft: 10,
      fontSize: 18,
    },

    addLinkBoxRight: {
      paddingLeft: '30px !important',
    },

    linkImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      padding: '0 5 0 0',
    },

    content: {
      margin: 0,
      width: '100%',
      height: '100%',
    },

    loadingContainer: {
      height: '100%',
      minHeight: 150,
    },
  };
};
