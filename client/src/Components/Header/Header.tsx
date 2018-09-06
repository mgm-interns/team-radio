import {
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
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
        <Toolbar color={'primary'}>
          <Grid container>
            <Grid item xs={12} md={9}>
              <div className={classes.containerLeft}>
                <IconButton color={'inherit'}>
                  <MdMenu />
                </IconButton>
                <Typography variant={'title'} color={'inherit'} className={classes.homeButton}>
                  Home
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.containerRight}>
                <IconButton color={'inherit'} onClick={this.openMenu}>
                  <MdAccountCircle />
                </IconButton>
                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.closeMenu}
                >
                  <MenuItem onClick={this.closeMenu}>Profile</MenuItem>
                  <MenuItem onClick={this.closeMenu}>Logout</MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
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
