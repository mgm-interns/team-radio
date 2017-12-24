import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import { addStation } from '../../../Redux/api/stations/actions';
import styles from './styles';

import { Images } from '../../../Theme';

class Backdrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stationName: '',
    };

    this._handleStationNameChanged = this._handleStationNameChanged.bind(this);
    this._submit = this._submit.bind(this);
  }

  _handleStationNameChanged(e) {
    this.setState({ stationName: e.target.value });
  }

  _submit() {
    this.props.addStation({
      stationName: this.state.stationName,
    });
  }

  render() {
    const { classes, loading, error } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs sm={10} lg={8} className={classes.formInput}>
            <div className={classes.sloganContainer}>
              <img src={Images.landing} alt="Team Radio" />
              <h3 className={classes.sloganText}>A Radio station for Teams</h3>
            </div>
            <FormControl className={classes.textField} error={!!error}>
              <InputLabel htmlFor="station-name">Your team station</InputLabel>
              <Input
                id="station-name"
                placeholder="Name your team station"
                margin="normal"
                autoFocus={true}
                onChange={this._handleStationNameChanged}
                value={this.state.stationName}
              />
              <FormHelperText>
                {error && error.response && error.response.error.name}
              </FormHelperText>
            </FormControl>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                raised
                color="primary"
                onClick={this._submit}
                className={classes.buttonSend}
              >
                Create <Icon className={classes.sendIcon}>send</Icon>
              </Button>
            )}
          </Grid>
          <Grid item xs className={classes.backgroundImg}>
            <img
              src="https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-483328.jpg"
              alt="Team Radio - Cover"
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
  loading: PropTypes.any,
  error: PropTypes.any,
  addStation: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: state.api.stations.loading,
  error: state.api.stations.error,
});

const mapDispatchToProps = dispatch => ({
  addStation: station => dispatch(addStation(station)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Backdrop);
