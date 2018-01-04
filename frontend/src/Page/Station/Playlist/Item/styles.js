export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    width: '100%',
    marginBottom: spacing.baseMargin,
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
    padding: spacing.baseMargin,
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
    width: spacing.baseMargin * 5,
    height: spacing.baseMargin * 5,
    '& .material-icons': {
      fontSize: spacing.baseMargin * 5,
    },
  },
  score: {
    ...typography.body2,
    margin: 'auto',
    width: spacing.baseMargin * 5,
    fontSize: 20,
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
});
