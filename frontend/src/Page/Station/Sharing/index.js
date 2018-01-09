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
import CopyIcon from 'react-icons/lib/go/clippy';
import { withNotification } from 'Component/Notification';
import styles from './styles';

const FACEBOOK_SHARING = 'https://www.facebook.com/sharer/sharer.php?u=';
const GOOGLE_PLUS_SHARING = 'https://plus.google.com/share?url=';
const TWITTER_SHARING = 'http://twitter.com/share?url=';

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
    this._shareTo = this._shareTo.bind(this);
    this.setStationUrl = this.setStationUrl.bind(this);
  }

  componentDidMount() {
    this.setStationUrl(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.currentStation && this.props.currentStation.id) !==
      (nextProps.currentStation && nextProps.currentStation.id)
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
      anchor: this.state.open ? event.target : null,
    });
  }

  _openPopover(event) {
    this.setState({
      open: true,
      anchor: event.target,
    });
  }

  _closePopover() {
    this.setState({ open: false }, () => {
      this.setState({ copied: false, anchor: null });
    });
  }

  _copyToClipboard() {
    try {
      this.inputRef.select();
      document.execCommand('Copy');

      this.setState({ copied: true });
      this.props.notification.app.info({
        message: 'Copied to clipboard',
      });
    } catch (error) {
      console.error(error);
      this.props.notification.app.warning({
        message: 'Fail to copy to clipboard!',
      });
    }
  }

  _shareTo(prefix) {
    try {
      this.setState({ open: false }, () => {
        window.open(`${prefix}${this.state.url}`, '_newtab');
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { classes, currentStation } = this.props;
    return (
      <div>
        <IconButton
          onClick={this._openPopover}
          color={this.state.open ? 'primary' : 'default'}
        >
          share
        </IconButton>
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={this.state.open}
          anchorEl={this.state.anchor}
          onClose={this._closePopover}
        >
          <Card>
            <CardContent>
              <Grid container className={classes.cardContainer}>
                <Grid item xs={12}>
                  <Typography type={'display1'} className={classes.cardHeader}>
                    Share{' '}
                    {currentStation ? (
                      <strong>{currentStation.station_name}</strong>
                    ) : (
                      'this station'
                    )}{' '}
                    to your friends
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Input
                    readOnly
                    className={classes.input}
                    value={this.state.url || ''}
                    inputRef={ref => {
                      this.inputRef = ref;
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container className={classes.actionsContainer}>
                <Tooltip placement={'right'} title={'Share on Facebook'}>
                  <IconButton
                    className={classes.facebookIcon}
                    onClick={() => this._shareTo(FACEBOOK_SHARING)}
                  >
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip placement={'right'} title={'Share on Google+'}>
                  <IconButton
                    className={classes.googleIcon}
                    onClick={() => this._shareTo(GOOGLE_PLUS_SHARING)}
                  >
                    <GoogleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip placement={'right'} title={'Share on Twitter'}>
                  <IconButton
                    className={classes.twitterIcon}
                    onClick={() => this._shareTo(TWITTER_SHARING)}
                  >
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  placement={'left'}
                  title={'Copy to clipboard'}
                  className={classes.copyIconWrapper}
                >
                  <IconButton
                    className={classes.copyIcon}
                    color={this.state.copied ? 'primary' : 'default'}
                    onClick={this._copyToClipboard}
                  >
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
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
  notification: PropTypes.object,
};

const mapStateToProps = ({ api }) => ({
  currentStation: api.currentStation.station,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  withNotification,
)(StationSharing);
