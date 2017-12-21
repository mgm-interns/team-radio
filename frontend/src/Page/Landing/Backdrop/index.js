import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import fixture from '../../../Fixture/landing';
import { addStation } from '../../../Redux/api/stations/actions';
import styles from './styles';

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
      <Grid container xs={12} className={classes.backdropContainer}>
        <Grid container className={classes.backdropForeground}>
          <Grid lg={12} className={classes.backdropSloganContainer}>
            <span className={classes.backdropSlogan}>{fixture.slogan}</span>
          </Grid>
          <Grid item xs lg={12} className={classes.formInput}>
            <TextField
              label="Name your station"
              placeholder="Name your station"
              margin="normal"
              autoFocus={true}
              className={classes.textField}
              onChange={this._handleStationNameChanged}
              value={this.state.stationName}
              error={error}
            />
            {loading ? (
              <div className={classes.buttonNew}>
                <CircularProgress />
              </div>
            ) : (
              <Button
                raised
                color="primary"
                className={classes.buttonNew}
                onClick={this._submit}
              >
                NEW <Icon className={classes.sendIcon}>send</Icon>
              </Button>
            )}
          </Grid>
          <Grid item xs={12} className={classes.backdropImg}>
            <img
              src="https://avante.biz/wp-content/uploads/Music-Wallpaper/Music-Wallpaper-001.jpg"
              alt="Team Radio - Cover"
              className={classes.backdropImg}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Backdrop.propTypes = {
  classes: PropTypes.any,
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
