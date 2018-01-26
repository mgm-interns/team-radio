import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Tabs, { Tab } from 'material-ui/Tabs';
import CircularProgress from 'material-ui/Progress/CircularProgress';

import { TabContainer } from 'Component';
import Settings from './Settings';
import { FilterAll, FilterFavourites } from './Filter';

import styles from './styles';

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this._renderTabsLabel = this._renderTabsLabel.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  _renderTabsLabel() {
    const { classes, isDisabled } = this.props;

    return (
      <Grid item xs={12} className={classes.actions}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label="Stations"
            classes={{
              label: classes.tabLabel,
            }}
          />
          {isDisabled && (
            <Tab
              label="Favourite songs"
              classes={{
                label: classes.tabLabel,
              }}
            />
          )}
        </Tabs>
      </Grid>
    );
  }

  render() {
    const { classes, userId, name, isDisabled } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item xs={11}>
          <Grid container>{this._renderTabsLabel()}</Grid>
        </Grid>
        <Grid item xs={1} className={classes.buttonEditProfile}>
          {isDisabled && <Settings />}
        </Grid>
        {this.state.value === 0 && (
          <TabContainer>
            <FilterAll userId={userId} name={name} isDisabled={isDisabled} />
          </TabContainer>
        )}
        {this.state.value === 1 && (
          <TabContainer>
            <FilterFavourites userId={userId} />
          </TabContainer>
        )}
      </Grid>
    );
  }
}

Body.propTypes = {
  userId: PropTypes.any.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  name: PropTypes.string,
};

Body.defaultProps = {
  userId: 0,
  isDisabled: false,
  name: '',
};

export default compose(withStyles(styles))(Body);
