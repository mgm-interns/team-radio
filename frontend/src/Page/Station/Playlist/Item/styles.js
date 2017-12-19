export default ({ spacing, palette, typography, ...other }) => {
  console.log(typography);
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
      ...typography.body2,
      fontWeight: 'bold',
    },
    singer: {
      ...typography.body2,
      fontWeight: 'bold',
    },
    uploader: {
      ...typography.caption,
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
      color: palette.secondary['600'],
      '&.active': {
        color: palette.primary['600'],
      },
    },
  };
};
