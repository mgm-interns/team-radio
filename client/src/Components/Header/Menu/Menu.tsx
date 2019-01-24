import { Avatar, Divider, Hidden, ListItemIcon, ListItemText, Menu as MuiMenu, MenuItem } from '@material-ui/core';
import { Authenticated, UnAuthenticated } from '@Modules/Authentication';
import { LoginMutation } from '@RadioGraphql/Authentication';
import { ThemeContext, ThemeType } from '@Themes';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import {
  MdAccountCircle,
  MdAssignment,
  MdPowerSettingsNew,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdVpnKey
} from 'react-icons/md';
import { RouteComponentProps, withRouter } from 'react-router';
import { useStyles } from './styles';

export const Menu: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const themeContext = React.useContext(ThemeContext);

  const {
    anchorEl,
    onClose,
    history: { push },
    match
  } = props;

  return (
    <MuiMenu
      id={'menu-appbar'}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(anchorEl)}
      onClose={() => onClose()}
    >
      <Authenticated
        disableLoading
        render={user => (
          <>
            <MenuItem
              onClick={() => {
                onClose();
                push('/profile');
              }}
            >
              <ListItemIcon>
                {!user.avatarUrl ? <MdAccountCircle /> : <Avatar src={user.avatarUrl} className={classes.avatar} />}
              </ListItemIcon>
              <ListItemText>{user.username}</ListItemText>
            </MenuItem>
            <Divider />
          </>
        )}
      />
      <Authenticated disableLoading>
        <MenuItem
          onClick={() => {
            onClose();
            push('/profile');
          }}
        >
          <ListItemText>Profile</ListItemText>
          <ListItemIcon>
            <MdAccountCircle />
          </ListItemIcon>
        </MenuItem>
      </Authenticated>
      <UnAuthenticated disableLoading>
        <Hidden smUp>
          <MenuItem
            onClick={() => {
              onClose();
              push('/login');
            }}
          >
            <ListItemText>Login</ListItemText>
            <ListItemIcon>
              <MdVpnKey />
            </ListItemIcon>
          </MenuItem>
        </Hidden>
      </UnAuthenticated>
      <UnAuthenticated disableLoading>
        <MenuItem
          onClick={() => {
            onClose();
            push('/register');
          }}
        >
          <ListItemText>Register</ListItemText>
          <ListItemIcon>
            <MdAssignment />
          </ListItemIcon>
        </MenuItem>
      </UnAuthenticated>
      <Authenticated disableLoading>
        <ApolloConsumer>
          {client => (
            <MenuItem
              onClick={() => {
                onClose();
                LoginMutation.clearLoginSession();
                client.resetStore();
                // FIXME: This is an temporary cheat, due to the websocket does not remove the connection
                if (match.path === '/station/:stationId') {
                  window.location.reload();
                }
              }}
            >
              <ListItemText>Logout</ListItemText>
              <ListItemIcon>
                <MdPowerSettingsNew />
              </ListItemIcon>
            </MenuItem>
          )}
        </ApolloConsumer>
      </Authenticated>
      <MenuItem
        onClick={() => {
          onClose();
          themeContext.switchTheme();
        }}
      >
        <ListItemText>Dark mode</ListItemText>
        <ListItemIcon>
          {themeContext.theme === ThemeType.LIGHT ? <MdRadioButtonUnchecked /> : <MdRadioButtonChecked />}
        </ListItemIcon>
      </MenuItem>
    </MuiMenu>
  );
};

interface CoreProps extends RouteComponentProps, Props {}

export default withRouter(Menu);

interface Props {
  anchorEl: HTMLElement | null;
  onClose(): void;
}
