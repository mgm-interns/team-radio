export default styles => ({
  station_title: {
    fontWeight: 'bold',
  },
  station_subtitle: {
    color: 'grey',
  },
  station_avatar: {
    width: '150px',
    height: '150px',
  },
  station_item: {
    marginRight: '2.5em',
    width: '150px',
  },
  station_info: {
    width: '150px',
  },
  '@media screen and (max-width: 500px)': {
    __expression__: 'screen and (max-width: 500px)',
    station_avatar: {
      width: '80px',
      height: '80px',
    },
    station_info: {
      width: '80px',
    },
    station_title: {
      fontSize: '16px',
    },
  },
});
