export default ({ spacing, palette, typography, ...other }) => {
  console.log(other);
  return {
    container: {
      marginBottom: spacing.unit,
      '&.playing': {
        background: '#e8e0d5',
      },
    },
    thumnail: {
      padding: spacing.unit,
    },
    img: {
      width: '100%',
      display: 'block',
    },
    info: {
      padding: spacing.unit,
    },
    name: {
      ...typography.body1,
      fontWeight: 'bold',
    },
    singer: {
      ...typography.body1,
      fontWeight: 'bold',
    },
    uploader: {
      ...typography.body1,
      color: palette.grey['600'],
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
      ...typography.body1,
      color: palette.secondary['600'],
      '&.active': {
        color: palette.primary['600'],
      },
    },
  };
};
