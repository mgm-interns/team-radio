export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    width: '100%',
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
    fontSize: '0.825em',
    fontWeight: 'bold',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.725em',
  },
  creator: {
    ...typography.caption,
    fontSize: '0.725em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  creatorAvatar: {
    marginLeft: spacing.baseMargin,
    width: '1.6em',
    height: '1.6em',
    border: '1px solid #ccc',
    borderRadius: '50%',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  actions: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  action: {
    width: spacing.baseMargin * 3,
    height: spacing.baseMargin * 3,
    '& .material-icons': {
      fontSize: spacing.baseMargin * 3,
    },
  },
  score: {
    ...typography.body2,
    margin: 'auto',
    width: spacing.baseMargin * 3,
    fontSize: '0.825em',
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
});
