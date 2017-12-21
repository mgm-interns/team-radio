export default ({ palette, breakpoints }) => ({
  // section
  sectionContainer: {
    margin: 0,
    background: palette.lightGrey['500'],
    lineHeight: '1.8',
    padding: '2em',
    paddingTop: '4em',
    paddingBottom: '4em',
    width: '100%',
  },
  sectionDescription: {
    textAlign: 'right',
    [breakpoints.up('lg')]: {
      fontSize: '40pt',
      paddingRight: '0',
    },
    [breakpoints.down('lg')]: {
      paddingTop: '3em',
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
    [breakpoints.up('lg')]: {
      paddingRight: '10em',
      paddingTop: '35em',
    },
  },
  sectionContent: {
    color: 'grey',
    [breakpoints.up('lg')]: {
      fontSize: '15pt',
    },
  },
  sectionImages: {
    [breakpoints.up('sm')]: {
      position: 'absolute',
      width: '30%',
      paddingTop: '1em',
      paddingLeft: '5em',
    },
    [breakpoints.up('lg')]: {
      width: '30%',
      paddingTop: '1em',
      paddingLeft: '5em',
      paddingBottom: '3em',
    },
  },
});
