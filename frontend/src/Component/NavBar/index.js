import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styles from './styles';
import AuthLink from '../AuthLink';

const MENUS = {
  home: {
    title: 'Home',
    url: '/',
  },
  stations: {
    title: 'My Station',
    url: '/station',
  },
};

const setColor = {
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

  render() {
    const { classes, color, dispatch } = this.props;

    return (
      <Grid
        container
        justify="center"
        className={classes.container}
        style={
          color === undefined && this.state.transform !== 0
            ? { filter: 'opacity(0.8)', backgroundColor: setColor.primary }
            : { backgroundColor: setColor[color] }
        }
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.wrapper}
        >
          <Grid item xs={4}>
            <Grid container className={classes.logo}>
              <Grid item xs>
                <Link to="/">
                  <img
                    src={fixture.logo}
                    alt="Team Radio"
                    className={classes.img}
                  />
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container className={classes.navContainer}>
              <Grid item className={classes.navWrapper}>
                {Object.keys(MENUS).map((key, index) => {
                  const { title } = MENUS[key];
                  return (
                    <Link
                      key={index}
                      to={MENUS[key].url}
                      className={classes.navItem}
                    >
                      {title}
                    </Link>
                  );
                })}

                <AuthLink dispatch={dispatch} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.any,
  style: PropTypes.any,
  color: PropTypes.string,
  dispatch: PropTypes.any,
};

export default compose(withStyles(styles), connect(undefined, undefined))(
  NavBar,
);
