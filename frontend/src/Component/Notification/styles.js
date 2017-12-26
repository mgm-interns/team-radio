export default theme => {
  console.log(theme);
  return {
    NotificationItem: {
      DefaultStyle: {
        minHeight: '100px',
      },
    },
    Title: {
      DefaultStyle: {
        ...theme.typography.body1,
        fontWeight: 'bold',
      },
    },
  };
};
