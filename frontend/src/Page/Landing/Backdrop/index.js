import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import fixture from 'Fixture/landing';
import { createStation } from 'Redux/api/stations/actions';
import styles from './styles';

/* eslint-disable no-shadow */
class Backdrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationName: '',
      message: '',
    };

    this._handleStationNameChanged = this._handleStationNameChanged.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    const { station, message } = nextProps;

    // Get error message when creating a station
    this.setState({ message });

    // Redirect to the created station page
    if (station && station.station_id) {
      history.replace(`/station/${station.station_id}`);
    }
  }

  _handleStationNameChanged(e) {
    const text = e.target.value;
    this.setState({ stationName: text });
  }

  _submit() {
    this.props.createStation(this.state.stationName);
  }

  render() {
    const { classes } = this.props;
    const { message, autoFocus } = this.state;
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
              <FormHelperText style={{ color: 'white' }}>
                {message}
              </FormHelperText>
            </FormControl>
            <Button
              raised
              color={fixture.button.color}
              onClick={this._submit}
              className={classes.buttonSend}
              disabled={!this.state.stationName}
            >
              {fixture.button.name}
              <Icon className={classes.sendIcon}>radio</Icon>
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
};

const mapStateToProps = ({ api: { stations } }) => ({
  station: stations.station,
  message: stations.message,
});

const mapDispatchToProps = dispatch => ({
  createStation: stationName => dispatch(createStation({ stationName })),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Backdrop);
