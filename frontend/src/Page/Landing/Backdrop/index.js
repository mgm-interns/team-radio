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
import fixture from 'Fixture/landing';
import { addStation } from 'Redux/api/stations';
import styles from './styles';

class Backdrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      station_name: '',
    };

    this._handleStationNameChanged = this._handleStationNameChanged.bind(this);
    this._submit = this._submit.bind(this);
  }

  _handleStationNameChanged(e) {
    this.setState({ station_name: e.target.value });
  }

  _submit() {
    this.props.addStation({
      station_name: this.state.station_name,
    });
  }

  render() {
    const { classes, loading, error } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.foreground}>
          <Grid item xs sm={10} lg={8} className={classes.formInput}>
            <div className={classes.sloganContainer}>
              <h1 className={classes.mainLine}>{fixture.name}</h1>
              <span className={classes.sloganText}>{fixture.slogan}</span>
            </div>
            <FormControl className={classes.textField} error={!!error}>
              <InputLabel htmlFor="station-name">
                {fixture.input.label}
              </InputLabel>
              <Input
                id="station-name"
                placeholder={fixture.input.placeholder}
                autoFocus={true}
                onChange={this._handleStationNameChanged}
                value={this.state.station_name}
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
                color={fixture.button.color}
                onClick={this._submit}
                className={classes.buttonSend}
                disabled={!this.state.station_name}
              >
                {fixture.button.name}
                <Icon className={classes.sendIcon}>radio</Icon>
              </Button>
            )}
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
  loading: PropTypes.any,
  error: PropTypes.any,
  addStation: PropTypes.func,
};

const mapStateToProps = ({ api: { stations } }) => ({
  loading: stations.add.loading,
  error: stations.add.error,
});

const mapDispatchToProps = dispatch => ({
  addStation: station => dispatch(addStation(station)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Backdrop);
