import { AppBar, IconButton, Menu, MenuItem, Toolbar, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { TextLink } from 'Components';
import * as React from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { styles } from './styles';

class CoreHeader extends React.Component<CoreHeader.Props, CoreHeader.States> {
  constructor(props: CoreHeader.Props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  public render(): React.ReactNode {
    const { classes, leftIcon, leftText } = this.props;
    return (
      <AppBar position={'static'} className={classes.container}>
        <Toolbar color={'primary'} className={classes.toolBarContainer}>
          <div className={classes.containerLeft}>
            {leftIcon}
            {leftText || (
              <TextLink
                linkTo={'/'}
                variant={'title'}
                color={'inherit'}
                children={'Home'}
                className={classes.homeButton}
              />
            )}
          </div>
          <div className={classes.containerRight}>
            <IconButton aira-owns={this.openMenu ? 'menu-appbar' : null} color={'inherit'} onClick={this.openMenu}>
              <MdAccountCircle />
            </IconButton>
            <Menu
              id={'menu-appbar'}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.closeMenu}
            >
              <TextLink linkTo={'/profile'} variant={'title'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
              </TextLink>
              <TextLink linkTo={'/login'} variant={'title'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>Login</MenuItem>
              </TextLink>
              <TextLink linkTo={'/register'} variant={'title'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>Register</MenuItem>
              </TextLink>
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
  }
}
