import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { redirectToStationPageRequest } from 'Redux/page/landing/actions';
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
    };

    this._handleStationNameChanged = this._handleStationNameChanged.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { redirectToStationPageRequest } = this.props;
    const { history } = this.props;
    const { station } = nextProps;
    if (station && station.id) {
      history.replace(`/station/${station.id}`);
      redirectToStationPageRequest();
    }
  }

  _handleStationNameChanged(e) {
    this.setState({ stationName: e.target.value });
  }

  _submit() {
    const { createStation, redirectToStationPageRequest } = this.props;
    createStation(this.state.stationName);
    redirectToStationPageRequest(true);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs sm={10} lg={8} className={classes.formInput}>
            <div className={classes.sloganContainer}>
              <h1 className={classes.mainLine}>{fixture.name}</h1>
              <span className={classes.sloganText}>{fixture.slogan}</span>
            </div>
            <FormControl
              className={classes.textField}
              // error={!!error}
            >
              <InputLabel htmlFor="station-name">
                {fixture.input.label}
              </InputLabel>
              <Input
                id="station-name"
                placeholder={fixture.input.placeholder}
                autoFocus={true}
                onChange={this._handleStationNameChanged}
                value={this.state.stationName}
              />
              {/*
              <FormHelperText>
                {error && error.response && error.response.error.name}
              </FormHelperText>
              */}
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
  redirectToStationPageRequest: PropTypes.func,
  station: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = ({ api: { stations } }) => ({
  station: stations.station,
});

const mapDispatchToProps = dispatch => ({
  createStation: stationName => dispatch(createStation({ stationName })),
  redirectToStationPageRequest: isRedirect =>
    dispatch(redirectToStationPageRequest(isRedirect)),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Backdrop);
