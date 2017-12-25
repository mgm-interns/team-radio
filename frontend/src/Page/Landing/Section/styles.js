export default ({ palette, breakpoints }) => ({
  // section
  sectionContainer: {
    margin: 0,
    background: palette.lightGrey['500'],
    padding: '2em',
    paddingTop: '4em',
    paddingBottom: '4em',
    width: '100%',
    height: '100vh',
  },
  sectionDescription: {
    textAlign: 'right',
    [breakpoints.down('xs')]: {
      lineHeight: '1.8',
    },
    [breakpoints.up('sm')]: {
      lineHeight: '2',
    },
  },
  sectionTitle: {
    fontWeight: 'bold',
    [breakpoints.up('lg')]: {
      fontSize: '25pt',
    },
  },
  sectionSubtitle: {
    [breakpoints.up('lg')]: {
      fontSize: '20pt',
    },
  },
  sectionContentContainer: {
    textAlign: 'right',
  },
  sectionContent: {
    color: 'grey',
    [breakpoints.up('lg')]: {
      fontSize: '15pt',
    },
  },
  sectionImages: {
    [breakpoints.down('xs')]: {
      width: '10%',
      paddingLeft: 0,
    },
    [breakpoints.up('sm')]: {
      width: '80%',
      paddingLeft: '5em',
    },
    [breakpoints.up('lg')]: {
      width: '60%',
      paddingLeft: '10em',
    },
  },
});
