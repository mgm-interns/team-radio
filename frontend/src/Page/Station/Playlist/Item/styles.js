export default ({ spacing, palette, typography }) => ({
  container: {
    marginBottom: spacing.unit,
    '&.playing': {
      background: palette.lightGrey['500'],
    },
  },
  thumbnail: {},
  img: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  info: {
    padding: spacing.unit,
  },
  name: {
    ...typography.body2,
    fontSize: '1em',
    fontWeight: 'bold',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.8em',
    fontWeight: 'bold',
  },
  uploader: {
    ...typography.caption,
    fontSize: '0.8em',
  },
  actions: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  action: {
    width: spacing.unit * 5,
    height: spacing.unit * 5,
    '& .material-icons': {
      fontSize: spacing.unit * 5,
    },
  },
  score: {
    ...typography.body2,
    margin: 'auto',
    width: spacing.unit * 5,
    fontSize: 20,
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
});
