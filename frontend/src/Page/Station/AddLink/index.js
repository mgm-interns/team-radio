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
    video_url: PropTypes.string,
    video: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onSendClick: PropTypes.func,
    isDisableButton: PropTypes.bool,
    isAddLinkProgress: PropTypes.bool,
  };

  _renderLoading() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={[classes.gridContainer, classes.loadingContainer]}
        justify="center"
        alignItems="center"
      >
        <CircularProgress color="primary" thickness={3} size={20} />
      </Grid>
    );
  }

  render() {
    const {
      classes,
      video,
      station,
      placeholder,
      onChange,
      onSendClick,
      isDisableButton,
      isAddLinkProgress,
    } = this.props;

    return (
      <Grid
        container
        className={[classes.gridContainer, classes.addLinkContainer]}
      >
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
              <Grid item xs={5} className={classes.addLinkBoxLeft}>
                <Grid
                  container
                  className={classes.gridContainer}
                  direction="column"
                  justify="space-between"
                >
                  <Grid item xs={12}>
                    <Input
                      className={classes.linkInput}
                      placeholder={placeholder}
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
              <Grid item xs={7} className={classes.addLinkBoxRight}>
                {isAddLinkProgress ? (
                  this._renderLoading()
                ) : (
                  <Grid
                    container
                    className={[classes.gridContainer, classes.content]}
                  >
                    <Grid item xs={4} className={classes.linkImg}>
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        className={classes.linkImg}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <h3>{video.snippet.title}</h3>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(AddLink);
