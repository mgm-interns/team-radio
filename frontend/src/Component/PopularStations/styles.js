export default styles => ({
  stations_container: {
    padding: '2em',
    marginLeft: '10em',
    marginRight: '10em',
    position: 'relative',
    marginBottom: '80px',
  },
  stations_primary: {
    border: '1px solid black',
    position: 'absolute',
    top: '-80px',
    background: 'white',
    padding: '8px',
    zIndex: '1000',
  },
  stations_primary_img: {
    width: '250px',
    height: '300px',
    objectFit: 'cover',
  },
  station_title: {
    fontWeight: 'bold',
  },
  station_subtitle: {
    color: 'grey',
  },
  '@media screen and (max-width: 1366px)': {
    __expression__: 'screen and (max-width: 1366px)',
    stations_container: {
      marginLeft: '1em',
      marginRight: '1em',
    },
  },
  '@media screen and (max-width: 500px)': {
    __expression__: 'screen and (max-width: 500px)',
    stations_primary: {
      display: 'none',
    },
    stations_container: {
      marginLeft: '0',
      marginRight: '0',
    },
  },
});
