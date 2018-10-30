import {
  AppBar,
  Avatar,
  Divider,
  Hidden,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { InternalLink } from 'Components';
import { Authenticated, UnAuthenticated } from 'Modules';
import { CurrentUserQuery, LoginMutation } from 'RadioGraphql';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import {
  MdAccountCircle,
  MdAssignment,
  MdMoreVert,
  MdPowerSettingsNew,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdVpnKey
} from 'react-icons/md';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThemeContext, ThemeType } from 'Themes';
import { styles } from './styles';

class Header extends React.Component<CoreProps, CoreStates> {
  constructor(props: CoreProps) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  public render(): React.ReactNode {
    const {
      classes,
      leftIcon,
      leftText,
      additionalRightIcons,
      history: { push }
    } = this.props;
    return (
      <AppBar position={'static'} className={classes.container}>
        <Toolbar color={'primary'} className={classes.toolBarContainer}>
          <div className={classes.containerLeft}>
            {leftIcon}
            <Hidden xsDown>
              {leftText || (
                <InternalLink
                  href={'/'}
                  variant={'h6'}
                  color={'inherit'}
                  children={'Home'}
                  className={classes.homeButton}
                />
              )}
            </Hidden>
          </div>
          <div className={classes.containerRight}>
            {additionalRightIcons}
            <Hidden smDown>
              <UnAuthenticated disableLoading>
                <IconButton color={'inherit'} onClick={() => push('/login')}>
                  <Tooltip title={'Login'}>
                    <MdVpnKey />
                  </Tooltip>
                </IconButton>
              </UnAuthenticated>
            </Hidden>
            <IconButton aira-owns={this.openMenu ? 'menu-appbar' : null} color={'inherit'} onClick={this.openMenu}>
              <CurrentUserQuery>
                {({ loading, error, data }) => (
                  <Tooltip title={'Menu'}>
                    {loading || error || !data.currentUser.avatarUrl ? (
                      <MdMoreVert />
                    ) : (
                      <Avatar src={data.currentUser.avatarUrl} className={classes.avatar} />
                    )}
                  </Tooltip>
                )}
              </CurrentUserQuery>
            </IconButton>
            {this.renderMenu()}
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  private renderMenu = () => {
    const {
      classes,
      history: { push }
    } = this.props;
    return (
      <Menu
        id={'menu-appbar'}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(this.state.anchorEl)}
        onClose={() => this.closeMenu()}
      >
        <Authenticated
          disableLoading
          render={user => (
            <>
              <MenuItem>
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
              this.closeMenu();
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
                this.closeMenu();
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
              this.closeMenu();
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
                  this.closeMenu();
                  LoginMutation.clearLoginSession();
                  client.resetStore();
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
        <ThemeContext.Consumer>
          {({ theme, switchTheme }) => (
            <MenuItem onClick={() => this.closeMenu(switchTheme)}>
              <ListItemText>Dark mode</ListItemText>
              <ListItemIcon>
                {theme.palette.type === ThemeType.LIGHT ? <MdRadioButtonUnchecked /> : <MdRadioButtonChecked />}
              </ListItemIcon>
            </MenuItem>
          )}
        </ThemeContext.Consumer>
      </Menu>
    );
  };

  private openMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  private closeMenu = (callback?: () => void) => {
    this.setState(
      {
        anchorEl: null
      },
      callback
    );
  };
}

interface CoreProps extends RouteComponentProps, WithStyles<typeof styles>, Props {}
interface CoreStates {
  anchorEl: HTMLElement;
}

export default withStyles(styles)(withRouter(Header));

export interface Props extends Identifiable, Styleable {
  leftIcon?: React.ReactNode;
  leftText?: React.ReactNode;
  additionalRightIcons?: React.ReactNode;
}
