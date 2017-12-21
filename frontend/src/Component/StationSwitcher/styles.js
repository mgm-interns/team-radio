export default ({ breakpoints, spacing }) => ({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    '& .slick-dots': {
      position: 'relative',
      bottom: 0,
    },
    '& .slick-arrow': {
      height: '100%',
      transition: '300ms',
      paddingLeft: 2,
      paddingRight: 2,
      '&::before': {
        fontSize: 16,
      },
      '&:hover': {
        background: 'rgba(255,255,255,0.33)',
      },
    },
  },
  station_wrapper: {
    display: 'flex !important',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: spacing.baseMargin,
  },
  station_title: {
    marginTop: spacing.smallMargin,
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
    marginBottom: spacing.baseMargin,
  },
  active_station: {
    border: '1px solid #333',
    background: 'white',
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
