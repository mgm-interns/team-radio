import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ImageCropper } from 'Component';
import Grid from 'material-ui/Grid';

class ImageCropperDemo extends Component {
  state = {
    uri: null,
  };
  render() {
    return (
      <Grid container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12}>
          <h1>Image Cropper Demo</h1>
        </Grid>
        <Grid item xs={12}>
          <ImageCropper
            onCrop={uri => this.setState({ uri })}
            aspectRatio={1}
          />
        </Grid>
        <Grid item xs={12}>
          <img width="500px" height="auto" src={this.state.uri} alt="" />
        </Grid>
      </Grid>
    );
  }
}

ImageCropperDemo.propTypes = {};

export default ImageCropperDemo;
