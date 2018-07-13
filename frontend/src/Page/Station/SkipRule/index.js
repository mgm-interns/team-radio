import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'material-ui/styles/withStyles';
import { withNotification } from 'Component/Notification';
import Tooltip from 'material-ui/Tooltip';
import FaCog from 'react-icons/lib/fa/cog';
import IconButton from 'material-ui/IconButton';
import Modal from 'material-ui/Modal';
import Grid from 'material-ui/Grid';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Typography from 'material-ui/Typography';
import Zoom from 'material-ui/transitions/Zoom';
import { setSkipRule } from 'Redux/api/skipRule';
import Card from 'material-ui/Card';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import styles from './styles';

class StationSkipRule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: this.props.currentStation.skip_by_station_owner ? '1' : '0',
    };
    this._toggleShowingConfigSkipRule = this._toggleShowingConfigSkipRule.bind(
      this,
    );
    this._handleChange = this._handleChange.bind(this);
  }

  _toggleShowingConfigSkipRule() {
    this.setState({
      open: !this.state.open,
    });
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({
      value: nextProps.currentStation.skip_by_station_owner ? '1' : '0',
    });
  }

  _handleChange = (event, value) => {
    this.setState({ value });

    const { station_id } = this.props.currentStation;
    const { userId } = this.props.userData;
    const skip_by_station_owner = value !== '0';
    const user_id = userId;

    this.props.setSkipRule(station_id, user_id, skip_by_station_owner);

    this.props.notification.app.success({
      message: 'The configuration is success',
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip placement={'bottom'} title="Configuration skip rule">
          <IconButton
            onClick={this._toggleShowingConfigSkipRule}
            color={this.state.open ? 'primary' : 'default'}
          >
            <FaCog />
          </IconButton>
        </Tooltip>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this._toggleShowingConfigSkipRule}
        >
          <Card style={this.state.modalStyle} className={classes.modal}>
            <Grid container>
              <Grid item xs={12} className={classes.modalHeadline}>
                {'Configuration skip rule'}
              </Grid>
              <div className="line" />
              <Grid item xs={12} className={classes.settingTabs}>
                <FormControl
                  component="fieldset"
                  required
                  className={classes.formControl}
                >
                  <RadioGroup
                    className={classes.group}
                    value={this.state.value}
                    onChange={this._handleChange}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Basic rule"
                    />
                    {this.state.value !== '0' ? null : (
                      <div>
                        <Zoom in={true}>
                          <Typography
                            className={classes.describeRule}
                          >{`Rule: More than 50% downvotes can skip the song`}</Typography>
                        </Zoom>
                      </div>
                    )}
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Advanced rule"
                    />

                    {this.state.value !== '1' ? null : (
                      <div>
                        <Zoom in={true}>
                          <Typography
                            className={classes.describeRule}
                          >{`Rule: Only you can skip the song`}</Typography>
                        </Zoom>
                      </div>
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      </div>
    );
  }
}

StationSkipRule.propTypes = {
  currentStation: PropTypes.object,
  classes: PropTypes.object,
  notification: PropTypes.object,
  passive: PropTypes.bool,
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation.station,
  userData: api.user.data,
});

const mapDispatchToProps = dispatch => ({
  setSkipRule: (station_id, user_id, skip_by_station_owner) =>
    dispatch(setSkipRule({ station_id, user_id, skip_by_station_owner })),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withNotification,
)(StationSkipRule);
