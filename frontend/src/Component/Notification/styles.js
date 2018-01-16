export default ({ spacing, typography, zIndex, ...others }) => {
  console.log(others);
  console.log({
    DefaultStyle: {
      zIndex: zIndex.modal - 1,
    },
  });
  return {
    NotificationItem: {
      success: {
        borderTop: '2px solid rgb(120, 159, 138)',
        backgroundColor: 'rgb(129, 175, 150)',
        color: 'rgb(244, 255, 249)',
        WebkitBoxShadow: '0 0 1px rgba(120, 159, 138, 0.9)',
        MozBoxShadow: '0 0 1px rgba(120, 159, 138, 0.9)',
        boxShadow: '0 0 1px rgba(120, 159, 138, 0.9)',
      },
      error: {
        borderTop: '2px solid rgb(191, 89, 64)',
        backgroundColor: 'rgb(224, 106, 78)',
        color: 'rgb(255, 255, 255)',
        WebkitBoxShadow: '0 0 1px rgba(191, 89, 64, 0.9)',
        MozBoxShadow: '0 0 1px rgba(191, 89, 64, 0.9)',
        boxShadow: '0 0 1px rgba(191, 89, 64, 0.9)',
      },
      warning: {
        borderTop: '2px solid rgb(167, 138, 61)',
        backgroundColor: 'rgb(222, 184, 83)',
        color: 'rgb(91, 91, 91)',
        WebkitBoxShadow: '0 0 1px rgba(167, 138, 61, 0.9)',
        MozBoxShadow: '0 0 1px rgba(167, 138, 61, 0.9)',
        boxShadow: '0 0 1px rgba(167, 138, 61, 0.9)',
      },
      info: {
        borderTop: '2px solid rgb(232, 224, 213)',
        backgroundColor: 'rgb(247, 243, 238)',
        color: 'rgb(128, 128, 128)',
        WebkitBoxShadow: '0 0 1px rgba(232, 224, 213, 0.9)',
        MozBoxShadow: '0 0 1px rgba(232, 224, 213, 0.9)',
        boxShadow: '0 0 1px rgba(232, 224, 213, 0.9)',
      },
    },
    Dismiss: {
      success: {
        color: 'rgb(240, 245, 234)',
        backgroundColor: 'rgb(120, 158, 137)',
      },
      error: {
        color: 'rgb(244, 233, 233)',
        backgroundColor: 'rgb(190, 90, 65)',
      },
      warning: {
        color: 'rgb(249, 246, 240)',
        backgroundColor: 'rgb(167, 138, 62)',
      },
      info: {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(212, 200, 184)',
      },
    },
    Containers: {
      DefaultStyle: {
        zIndex: zIndex.modal - 1,
      },
      tr: {
        top: 50,
        right: spacing.baseMargin * -1,
      },
      br: {
        right: spacing.baseMargin * -1,
      },
      tl: {
        top: 50,
        right: spacing.baseMargin,
      },
      bl: {
        right: spacing.baseMargin,
      },
    },
    Title: {
      DefaultStyle: {
        ...typography.body1,
      },
    },
  };
};
