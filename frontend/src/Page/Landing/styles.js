export default ({ palette }) => ({
  // backdrop cover
  backdropContainer: {
    position: 'relative',
    margin: 'auto',
    padding: 'auto',
  },
  backdropForeground: {
    background: palette.darkGreen['500'],
    height: '40vh',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    margin: 0,
    padding: '8%',
  },
  // backdropWrapper: {
  //   // fontWeight: 'bold',
  //   padding: '8%',
  // },
  backdropImg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    margin: 'auto',
    filter: 'opacity(0.4)',
    zIndex: -1,
  },
  backdropSlogan: {
    fontSize: '20pt',
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    zIndex: 2,
  },
  formInput: {
    margin: 'auto',
    zIndex: 2,
    textAlign: 'center',
  },
  buttonSubmit: {
    paddingTop: '10px',
  },

  // popular stations
  stationsContainer: {
    padding: '2em',
    margin: 0,
  },
  stationsWrapper: {
    justifyContent: 'center',
  },
  stationPrimary: {},
  stationPrimaryAvatar: {
    width: '100%',
    height: '100%',
  },
  stationPrimaryTitle: {},
  stationPrimarySubTitle: {},
  stationSecondary: {},
  stationItem: {},
  stationSecondaryAvatar: {},
  stationSecondaryTitle: {},
  stationSecondarySubTitle: {},

  // section
  sectionContainer: {
    margin: 0,
    background: palette.lightGrey['500'],
    padding: '8%',
    lineHeight: '1.8',
  },
  sectionDescription: {},
  sectionTitle: {},
  sectionSubtitle: {},
  sectionContent: {},
  sectionImages: {
    // maxWidth: '60%',
  },
});
