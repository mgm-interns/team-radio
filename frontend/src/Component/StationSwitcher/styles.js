export default ({ breakpoints, spacing }) => ({
  container: {
    margin: 'auto',
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    '& .slick-track': {
      // height: 140,
    },
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
    [breakpoints.up('lg')]: {
      minWidth: 1024,
      maxWidth: 1280,
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
    fontSize: '13pt',
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 158,
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
      fontSize: '0.875em',
    },
    station_subtitle: {
      color: 'grey',
      fontSize: '0.65em',
    },
    loadingContainer: {
      minHeight: 138,
    },
  },
});
