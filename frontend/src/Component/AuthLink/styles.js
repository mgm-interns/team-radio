export default ({ palette, spacing }) => ({
  avatar: {
    width: 30,
    height: 30,
    marginLeft: '16px',
    borderRadius: '40px',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    border: '1px solid #1b1f2326',
    background: palette.white,
    minWidth: '160px',
    zIndex: '100',
    '& a': {
      display: 'block',
      cursor: 'pointer',
      color: '#24292e',
      padding: '10px',
      borderBottom: '1px solid #e1e4e8',
      '&:hover': {
        background: '#e1e4e8',
      },
    },
  },
  show: {
    display: 'block',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  dropdownIcon: {
    color: palette.white,
  },
  navItem: {
    marginLeft: '16px',
    textDecoration: 'none',
    color: palette.white,
  },
  userInfoContainer: {
    cursor: 'pointer',
  },
  profileLink: {
    textDecoration: 'none',
    color: palette.black,
  },
  displayName: {
    display: 'inline',
    color: palette.white,
    paddingLeft: spacing.doubleBaseMargin,
  },
});
