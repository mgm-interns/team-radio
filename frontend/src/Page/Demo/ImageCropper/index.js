import React, { Component } from 'react';
import { ImageCropper } from 'Component';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import withStyles from 'material-ui/styles/withStyles';
import styles from './styles';

class ImageCropperDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSource: 'https://f.vimeocdn.com/si/email/uploading.gif',
      secondSource:
        'http://www.followingthenerd.com/site/wp-content/uploads/avatar.jpg_274898881.jpg',
    };

    this._renderSecondItem = this._renderSecondItem.bind(this);
  }

  _renderSecondItem() {
    const { classes } = this.props;
    return () => (
      <div className={classes.secondButton}>
        <img width={'100%'} src={this.state.secondSource} alt="" />
        <div className="backdrop">
          <Icon className={classes.backdropIcon}>file_upload</Icon>
        </div>
      </div>
    );
  }
  render() {
    const { classes } = this.props;

    const SecondButton = this._renderSecondItem();
    return (
      <Grid container className={classes.container}>
        <Grid item xs={1} />
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <h1>Image Cropper Demo</h1>
            </Grid>
            <Grid item xs={12}>
              <ImageCropper
                onCrop={firstSource => this.setState({ firstSource })}
                aspectRatio={16 / 9}
              />
            </Grid>
            <Grid item xs={12}>
              <img
                width={'100%'}
                height="auto"
                src={this.state.firstSource}
                alt=""
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <h1>Avatar Uploader Demo</h1>
            </Grid>
            <Grid item xs={12}>
              <ImageCropper
                buttonComponent={<SecondButton />}
                onCrop={secondSource => this.setState({ secondSource })}
                aspectRatio={1}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    );
  }
}

export default withStyles(styles)(ImageCropperDemo);
