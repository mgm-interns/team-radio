import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import { compose } from 'redux';
import { isElectronInstance } from 'Util/electron';
import WhatsNew from '../WhatsNew';
import AuthLink from '../AuthLink';
import MenuBar from '../MenuBar';
import styles from './styles';

const MENUS = {
  home: {
    title: 'Home',
    url: '/',
  },
  // stations: {
  //   title: 'My Station',
  //   url: '/station',
  // },
};

const COLOR_SET = {
  default: 'rgba(10, 55, 58, 0.4) !important',
  primary: '#e06a4e',
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transform: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleNavStyle = this.handleNavStyle.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const element = event.target || event.srcElement;
    const { scrollTop } = element.documentElement;
    this.setState({
      transform: scrollTop,
    });
  }

  handleNavStyle() {
    const { color } = this.props;
    if (isElectronInstance()) {
      return { backgroundColor: COLOR_SET[color || 'primary'] };
    }
    let navStyle = {
      backgroundColor: COLOR_SET[color] || 'transparent',
      boxShadow: 'none',
    };
    if (this.state.transform !== 0) {
      navStyle = { filter: 'opacity(0.8)', backgroundColor: COLOR_SET.primary };
    }
    return navStyle;
  }

  render() {
    const { classes, dispatch } = this.props;

    return [
      <MenuBar key="menu" />,
      <AppBar
        key="app-bar"
        style={{
          ...this.handleNavStyle(),
          top: isElectronInstance() ? 30 : 0,
        }}
      >
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justify="center"
            className={classes.wrapper}
          >
            <Grid item xs={4}>
              <Grid container className={classes.logo}>
                <Grid item xs={2}>
                  <Link to="/" replace>
                    <img
                      src={fixture.logo}
                      alt="Team Radio"
                      className={classes.img}
                    />
                  </Link>
                </Grid>

                <Hidden smDown>
                  <Grid item xs={10} style={{ marginTop: 2.075 }}>
                    {Object.keys(MENUS).map((key, index) => {
                      const { title } = MENUS[key];
                      return (
                        <Link
                          key={index}
                          to={MENUS[key].url}
                          replace
                          className={classes.navItemWrapper}
                        >
                          <Typography className={classes.navItem} type="body1">
                            {title}
                          </Typography>
                        </Link>
                      );
                    })}
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container className={classes.navContainer}>
                <Grid item className={classes.navWrapper}>
                  <WhatsNew />
                  <AuthLink dispatch={dispatch} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>,
    ];
  }
}

NavBar.propTypes = {
  classes: PropTypes.any,
  style: PropTypes.any,
  color: PropTypes.string,
  dispatch: PropTypes.any,
};

export default compose(withStyles(styles))(NavBar);
