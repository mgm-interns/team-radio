import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Grid from 'material-ui/Grid';
import Switch from 'material-ui/Switch';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import RadioIcon from 'react-icons/lib/md/radio';

import { withStyles } from 'material-ui/styles';
import { createStation } from 'Redux/api/stations/actions';

import fixture from 'Fixture/landing';
import styles from './styles';
import * as constants from '../../../Util/constants';

/* eslint-disable no-shadow */
class Backdrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationName: '',
      message: '',
      isPrivate: false,
    };

    this._handleStationNameChanged = this._handleStationNameChanged.bind(this);
    this._handleSwitchChange = this._handleSwitchChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { station, message } = nextProps;

    // Get error message when creating a station
    this.setState({ message });

    // Redirect to the created station page
    if (station && station.station_id) {
        const localStationsToken = localStorage.getItem(constants.LOCAL_STORAGE_ANONYMOUS_STATIONS);
        let localStationsArray = localStationsToken ?  JSON.parse(localStationsToken) : [];
        localStationsArray.push(station.station_id);
        localStorage.setItem(constants.LOCAL_STORAGE_ANONYMOUS_STATIONS, JSON.stringify(localStationsArray));
        history.replace(`/station/${station.station_id}`);
    }
  }

  _handleStationNameChanged(e) {
    const text = e.target.value;
    this.setState({ stationName: text });
  }

  _handleSwitchChange(e, checked) {
    this.setState({
      isPrivate: checked,
    });
  }

  _submit() {
    const { createStation, userId } = this.props;
    const { stationName, isPrivate } = this.state;

    createStation({ stationName, userId, isPrivate });
  }

  render() {
    const { classes, isAuthenticated } = this.props;
    const { message, autoFocus, isPrivate } = this.state;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs sm={10} lg={8} className={classes.formInput}>
            <div className={classes.sloganContainer}>
              <h1 className={classes.mainLine}>{fixture.name}</h1>
              <span className={classes.sloganText}>{fixture.slogan}</span>
            </div>
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="station-name">
                {fixture.input.label}
              </InputLabel>
              <Input
                id="station-name"
                placeholder={fixture.input.placeholder}
                autoFocus={autoFocus}
                onChange={this._handleStationNameChanged}
                value={this.state.stationName}
              />
              {message && <FormHelperText error>{message}</FormHelperText>}
              {isAuthenticated ? (
                <div className={classes.privateOption}>
                  <span>Private Station</span>
                  <Switch
                    classes={{
                      checked: classes.checked,
                      bar: classes.bar,
                    }}
                    checked={isPrivate}
                    onChange={this._handleSwitchChange}
                    aria-label="isPrivate"
                  />
                </div>
              ) : null}
            </FormControl>
            <Button
              raised
              color={fixture.button.color}
              onClick={this._submit}
              className={classes.buttonSend}
              disabled={!this.state.stationName}
            >
              {fixture.button.name}
              <Icon className={classes.sendIcon}>
                <RadioIcon />
              </Icon>
            </Button>
          </Grid>
          <Grid item xs className={classes.backgroundImg}>
            <img
              src={fixture.background.src}
              alt={fixture.background.alt}
              className={classes.backgroundImg}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Backdrop.propTypes = {
  classes: PropTypes.any,
  createStation: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
  message: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  userId: PropTypes.string,
};

const mapStateToProps = ({ api: { stations, user } }) => ({
  station: stations.station,
  message: stations.message,
  isAuthenticated: user.isAuthenticated,
  userId: user.data.userId,
});

const mapDispatchToProps = dispatch => ({
  createStation: ({ stationName, userId, isPrivate }) => {
    dispatch(createStation({ stationName, userId, isPrivate }));
  },
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Backdrop);
