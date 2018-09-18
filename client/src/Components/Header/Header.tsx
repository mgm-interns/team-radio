import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { TextLink } from 'Components';
import { Link } from 'react-router-dom';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { MdAccountCircle, MdMenu } from 'react-icons/md';
import { styles } from './styles';

export class CoreHeader extends React.Component<Header.CoreProps, Header.States> {
  constructor(props: Header.CoreProps) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <AppBar position={'fixed'} className={classes.container}>
        <Toolbar color={'primary'} className={classes.toolBarContainer}>
          <div className={classes.containerLeft}>
            <TextLink
              linkTo={'./'}
              variant={'title'}
              color={'inherit'}
              children={'Home'}
              className={classes.homeButton}
            />
            <TextLink
              linkTo={'./station'}
              variant={'title'}
              color={'inherit'}
              children={'Station'}
              className={classes.homeButton}
            />
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
              <TextLink linkTo={'./profile'} variant={'title'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
              </TextLink>
              <TextLink linkTo={'./login'} variant={'title'} color={'inherit'} className={classes.homeButton}>
                <MenuItem onClick={this.closeMenu}>Login</MenuItem>
              </TextLink>
              <TextLink linkTo={'./register'} variant={'title'} color={'inherit'} className={classes.homeButton}>
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

export const Header = withStyles(styles)(CoreHeader);

export namespace Header {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {
    anchorEl: HTMLElement;
  }
}
