import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import styles from './styles';

const MENUS = {
  home: {
    title: 'Home',
    url: '/',
  },
  stations: {
    title: 'My Station',
    url: '/station',
  },
  // login: {
  //   title: 'Login',
  //   url: '/auth/login',
  // },
};

// const function isLogin(params) {
//   ret
// }

// const defaultColor = 'rgba(10, 55, 58, 0.4) !important';

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
    const { classes, color } = this.props;
    const menusLength = Object.keys(MENUS).length;
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
                    <Link key={index} to={MENUS[key].url}>
                      {/* {index === menusLength - 1 ? title : `${title} - `} */}
                      {title + " - "}
                    </Link>
                  );
                })}
        
                <AuthLink />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class AuthLink extends Component {
  constructor(props) {
    super(props);
    console.log(props.match)
    this.state = {
      item: {
        
      },
    };
  }

  _getItem() {
    if(localStorage.getItem('token')) {
      return (
        <a onClick={this._logout.bind(this)}>Logout</a>
      )
    }
    else {
      return (
        <Link to='auth/login'>Login</Link>
      )
    }
  }

  _logout() {
    localStorage.removeItem('token');
    this.forceUpdate();
  }

  componentWillMount() {
    this.setState(() => {
      return {
        item: this._getItem()
      };
    })
  }

  render() {
    return (
      this._getItem.bind(this)()
    )
  }
}


NavBar.propTypes = {
  classes: PropTypes.any,
  style: PropTypes.any,
  color: PropTypes.string,
};

export default withStyles(styles)(NavBar);
