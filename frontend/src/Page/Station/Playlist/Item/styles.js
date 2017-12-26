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
    fontSize: '0.75em',
    fontWeight: 'bold',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.70em',
    fontWeight: 'bold',
  },
  uploader: {
    ...typography.caption,
    fontSize: '0.65em',
  },
  actions: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  action: {
    width: spacing.unit * 3,
    height: spacing.unit * 3,
  },
  score: {
    ...typography.body2,
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
});
