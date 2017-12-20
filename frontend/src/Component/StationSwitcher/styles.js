export default ({ breakpoints }) => ({
  station_wrapper: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 0',
  },

  station_title: {
    fontWeight: 'bold',
  },
  station_subtitle: {
    color: 'grey',
    fontSize: '0.75em',
  },
  station_avatar: {
    width: '100px',
    height: '100px',
  },
  station_item: {
    marginRight: '2.5em',
    width: '100px',
  },
  station_info: {
    width: '100px',
  },
  active_station: {
    border: '2px solid #333',
  },
  [breakpoints.down('sm')]: {
    station_avatar: {
      width: '80px',
      height: '80px',
    },
    station_info: {
      width: '80px',
    },
    station_title: {
      fontSize: '1.2em',
    },
    station_subtitle: {
      color: 'grey',
      fontSize: '0.65em',
    },
  },
});
