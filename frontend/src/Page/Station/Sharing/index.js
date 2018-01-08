import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withStyles from 'material-ui/styles/withStyles';
import Popover from 'material-ui/Popover';
import Grid from 'material-ui/Grid';
import Tooltip from 'material-ui/Tooltip';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import FacebookIcon from 'react-icons/lib/fa/facebook-square';
import GoogleIcon from 'react-icons/lib/fa/google-plus-square';
import TwitterIcon from 'react-icons/lib/fa/twitter-square';
import styles from './styles';

class StationSharing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchor: null,
      url: '',
      copied: false,
    };

    this._openPopover = this._openPopover.bind(this);
    this._closePopover = this._closePopover.bind(this);
    this._togglePopover = this._togglePopover.bind(this);
    this._copyToClipboard = this._copyToClipboard.bind(this);
    this.setStationUrl = this.setStationUrl.bind(this);
  }

  componentDidMount() {
    this.setStationUrl();
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.currentStation && this.props.currentStation.id) !==
      nextProps.currentStation.id
    ) {
      this.setState({
        copied: false,
      });

      this.setStationUrl(nextProps);
    }
  }

  setStationUrl(nextProps = {}) {
    if (nextProps.currentStation) {
      this.setState({
        url: StationSharing._transformUrl(nextProps.currentStation.id),
      });
    }
  }

  // eslint-disable-next-line
  static _transformUrl(stationId) {
    /**
     * Only need to return window.location
     */
    return window.location.href;
  }
  _togglePopover(event) {
    this.setState({
      open: !this.state.open,
      anchor: event.target,
    });
  }

  _openPopover(event) {
    this.setState({
      open: true,
      anchor: event.target,
    });
  }

  _closePopover(event) {
    this.setState({
      open: false,
      anchor: event.target,
    });
  }

  _copyToClipboard() {
    this.setState({
      copied: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton onClick={this._openPopover}>share</IconButton>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          anchorEl={this.state.anchor}
          onClose={this._closePopover}
        >
          <Card>
            <CardContent>
              <Grid container style={{ width: '100%', margin: 'auto' }}>
                <Grid item xs={12}>
                  <Typography type={'display1'} style={{ fontSize: '1.3em' }}>
                    Share this station
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    value={this.state.url || ''}
                    className={classes.input}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Tooltip placement={'right'} title={'Copy to clipboard'}>
                <IconButton
                  color={this.state.copied ? 'primary' : 'default'}
                  onClick={this._copyToClipboard}
                >
                  content_copy
                </IconButton>
              </Tooltip>
              <Tooltip placement={'right'} title={'Share on Facebook'}>
                <IconButton className={classes.facebookIcon}>
                  <FacebookIcon />
                </IconButton>
              </Tooltip>
              <Tooltip placement={'right'} title={'Share on Google+'}>
                <IconButton className={classes.googleIcon}>
                  <GoogleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip placement={'right'} title={'Share on Twitter'}>
                <IconButton className={classes.twitterIcon}>
                  <TwitterIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Popover>
      </div>
    );
  }
}

StationSharing.propTypes = {
  currentStation: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation.station,
});

export default compose(withStyles(styles), connect(mapStateToProps))(
  StationSharing,
);
