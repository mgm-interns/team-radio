import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Card from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';
import styles from './styles';

class AddLink extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    station: PropTypes.object,
    videoUrl: PropTypes.string,
    video: PropTypes.object,
    onChange: PropTypes.func,
    onSendClick: PropTypes.func,
    isDisableButton: PropTypes.bool,
    isAddLinkProgress: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this._renderLinkBoxSection = this._renderLinkBoxSection.bind(this);
    this._renderPreviewSection = this._renderPreviewSection.bind(this);
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <CircularProgress color="primary" thickness={3} size={20} />
      </Grid>
    );
  }

  _renderEmptyComponent() {
    const { classes } = this.props;

    return (
      <Grid
        container
        className={classes.loadingContainer}
        justify="center"
        alignItems="center"
      >
        <span>Not found</span>
      </Grid>
    );
  }

  _renderLinkBoxSection() {
    const { classes, onChange, isDisableButton, onSendClick } = this.props;

    return (
      <Grid item md={5} xs={12} className={classes.addLinkBoxLeft}>
        <Grid
          container
          className={classes.gridContainer}
          direction="column"
          justify="space-between"
        >
          <Grid item xs={12}>
            <Input
              className={classes.linkInput}
              placeholder="Add your link..."
              autoFocus
              fullWidth
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.sendBtn}
              raised
              color="primary"
              disabled={isDisableButton}
              onClick={onSendClick}
            >
              Send <Icon className={classes.sendIcon}>send</Icon>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  _renderPreviewSection() {
    const { classes, video, isAddLinkProgress } = this.props;
    let view = null;
    if (video.id === undefined) {
      view = this._renderEmptyComponent();
    } else if (isAddLinkProgress) {
      view = this._renderLoading();
    } else {
      view = (
        <Grid container className={classes.content}>
          <Grid item sm={4} xs={12} className={classes.previewImg}>
            <img
              src={video.snippet.thumbnails.medium.url}
              className={classes.previewImg}
            />
          </Grid>
          <Grid item sm={8} xs={12}>
            <p className={classes.previewTitle}>{video.snippet.title}</p>
            <p className={classes.secondaryTitle}>
              Channel: {video.snippet.channelTitle}
            </p>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid item md={7} xs={12} className={classes.addLinkBoxRight}>
        {view}
      </Grid>
    );
  }

  render() {
    const { classes, station } = this.props;

    return (
      <Grid container className={classes.addLinkContainer}>
        <Grid item xs={12} className={classes.linkTitle}>
          <div>
            <h1 className={classes.primaryTitle}>
              ADD TO STATION {station.number}
            </h1>
            <span className={classes.secondaryTitle}> - {station.name}</span>
          </div>
        </Grid>
        <Card className={classes.addLinkBox}>
          <Grid item xs={12}>
            <Grid container className={classes.gridContainer}>
              {this._renderLinkBoxSection()}
              {this._renderPreviewSection()}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(AddLink);
