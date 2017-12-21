export default ({ palette, breakpoints }) => ({
  // section
  sectionContainer: {
    margin: 0,
    background: palette.lightGrey['500'],
    // width: '25%',
    lineHeight: '1.8',
    padding: '2%',
    paddingLeft: '10em',
    paddingRight: '10em',
    paddingBottom: '8em',
  },
  stationsWrapper: {
    [breakpoints.up('lg')]: {
      // maxWidth: '0%',
    },
  },
  sectionDescription: {
    [breakpoints.up('lg')]: {
      fontSize: '40pt',
      textAlign: 'right',
      paddingRight: '0',
    },
  },
  sectionTitle: {
    [breakpoints.up('lg')]: {
      fontSize: '25pt',
      fontWeight: 'bold',
    },
  },
  sectionSubtitle: {
    [breakpoints.up('lg')]: {
      fontSize: '20pt',
    },
  },
  sectionContentContainer: {
    [breakpoints.up('lg')]: {
      textAlign: 'right',
      paddingRight: '10em',
      paddingTop: '35em',
    },
  },
  sectionContent: {
    [breakpoints.up('lg')]: {
      fontSize: '15pt',
      color: 'grey',
    },
  },
  sectionImages: {
    [breakpoints.up('lg')]: {
      position: 'absolute',
      width: '25%',
      paddingTop: '5em',
    },
  },
});
