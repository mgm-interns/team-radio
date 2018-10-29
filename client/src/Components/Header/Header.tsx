import {
  AppBar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { InternalLink } from 'Components';
import * as React from 'react';
import {
  MdAccountCircle,
  MdAssignment,
  MdFingerprint,
  MdMoreVert,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked
} from 'react-icons/md';
import { ThemeContext, ThemeType } from 'Themes';
import { styles } from './styles';

class CoreHeader extends React.Component<CoreHeader.Props, CoreHeader.States> {
  constructor(props: CoreHeader.Props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  public render(): React.ReactNode {
    const { classes, leftIcon, leftText, additionalRightIcons } = this.props;
    return (
      <AppBar position={'static'} className={classes.container}>
        <Toolbar color={'primary'} className={classes.toolBarContainer}>
          <div className={classes.containerLeft}>
            {leftIcon}
            {leftText || (
              <InternalLink
                href={'/'}
                variant={'h6'}
                color={'inherit'}
                children={'Home'}
                className={classes.homeButton}
              />
            )}
          </div>
          <div className={classes.containerRight}>
            {additionalRightIcons}
            <IconButton aira-owns={this.openMenu ? 'menu-appbar' : null} color={'inherit'} onClick={this.openMenu}>
              <MdMoreVert />
            </IconButton>
            <Menu
              id={'menu-appbar'}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.closeMenu}
            >
              <InternalLink href={'/profile'} variant={'h6'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>
                  <ListItemText>Profile</ListItemText>
                  <ListItemIcon>
                    <MdAccountCircle />
                  </ListItemIcon>
                </MenuItem>
              </InternalLink>
              <InternalLink href={'/login'} variant={'h6'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>
                  <ListItemText>Login</ListItemText>
                  <ListItemIcon>
                    <MdFingerprint />
                  </ListItemIcon>
                </MenuItem>
              </InternalLink>
              <InternalLink href={'/register'} variant={'h6'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>
                  <ListItemText>Register</ListItemText>
                  <ListItemIcon>
                    <MdAssignment />
                  </ListItemIcon>
                </MenuItem>
              </InternalLink>
              <ThemeContext.Consumer>
                {({ theme, switchTheme }) => (
                  <MenuItem onClick={() => switchTheme()}>
                    <ListItemText>Dark mode</ListItemText>
                    <ListItemIcon>
                      {theme.palette.type === ThemeType.LIGHT ? <MdRadioButtonUnchecked /> : <MdRadioButtonChecked />}
                    </ListItemIcon>
                  </MenuItem>
                )}
              </ThemeContext.Consumer>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  private openMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  private closeMenu = () => {
    this.setState({
      anchorEl: null
    });
  };
}

namespace CoreHeader {
  export interface Props extends Header.Props, WithStyles<typeof styles> {}
  export interface States {
    anchorEl: HTMLElement;
  }
}

export const Header: React.ComponentType<Header.Props> = withStyles(styles)(CoreHeader);

export namespace Header {
  export interface Props extends Identifiable, Styleable {
    leftIcon?: React.ReactNode;
    leftText?: React.ReactNode;
    additionalRightIcons?: React.ReactNode;
  }
}
