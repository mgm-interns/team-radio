import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { TabContainer } from 'Component';

import Settings from './Settings';
import { FilterAll, FilterFavorites } from './Filter';
import styles from './styles';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, user, isDisabled } = this.props;
    console.log(user);

    return (
      <Grid container className={classes.container}>
        <Grid item xs={12} md={7} xl={8}>
          <Grid container>
            <Grid item xs={12} className={classes.actions}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="All" />
                <Tab label="Favorites" />
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} xl={4} className={classes.buttonEditProfile}>
          {isDisabled && <Settings user={user} />}
        </Grid>
        {this.state.value === 0 && (
          <TabContainer>
            <FilterAll user={user} />
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer>
            <FilterFavorites />
          </TabContainer>
        )}
      </Grid>
    );
  }
}

Body.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.any,
  loading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default compose(withStyles(styles))(Body);
