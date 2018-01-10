import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid/Grid';
import Icon from 'material-ui/Icon/Icon';
import withStyles from 'material-ui/styles/withStyles';
import Cropper from 'react-cropper';
import toBase64 from 'Util/toBase64';
import sleep from 'Util/sleep';
import styles from './styles';

class ImageCropper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      isOpen: false,
      originData: null,
      croppedData: null,
      rotation: 0,
    };

    this._openDialog = this._openDialog.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
    this._openFilePickerDialog = this._openFilePickerDialog.bind(this);
    this._onCropperReady = this._onCropperReady.bind(this);
    this._onImagePicked = this._onImagePicked.bind(this);
    this._crop = this._crop.bind(this);
    this._rotateTo = this._rotateTo.bind(this);
    this.onPressPreview = this.onPressPreview.bind(this);
    this.onPressCrop = this.onPressCrop.bind(this);
    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressRotate = this.onPressRotate.bind(this);
    this.setStateAsync = this.setStateAsync.bind(this);
  }

  /**
   * similar to setState but allowing async/await
   */
  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  /**
   * Crop cropped box then export to cropped data
   */
  _crop() {
    return this.setStateAsync({
      // croppedData: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  /**
   * Rotate origin image to specify degree
   * @param {number} degree
   */
  async _rotateTo(degree = 0) {
    /**
     * Calculate degree of the rotation
     * if the degree is more than 360, rotation will return to 0
     * For example:
     * - 360 => 0
     * - 450 => 90
     */
    let rotation = degree;
    while (degree >= 360) {
      rotation -= 360;
    }
    // Update rotation then apply to cropped canvas
    await this.setStateAsync({ rotation });
    await this._crop();
  }

  /**
   * Open cropper modal
   */
  _openDialog() {
    this.setState({ isOpen: true });
  }

  /**
   * Close cropper modal
   */
  async _closeDialog() {
    await this.setStateAsync({ isOpen: false });
    this.input.value = null;
    await this.setStateAsync({ croppedData: null, originData: null });
  }

  /**
   * Trigger click event for <input type="file" />
   */
  _openFilePickerDialog(event) {
    event.preventDefault();
    this.input.click();
  }

  /**
   * Trigger this function when user finished picking
   * image from File Picker dialog
   */
  async _onImagePicked(event) {
    const file = event.target.files[0];
    const base64 = await toBase64(file);
    await this.setStateAsync({ originData: base64 });

    this._openDialog();
    await sleep();
    this._crop();
  }

  /**
   * Trigger when Cropper is ready
   */
  async _onCropperReady() {
    await this._rotateTo(0);
    await this.setStateAsync({ ready: true });
  }

  /**
   * Trigger when Preview button is pressed
   */
  onPressPreview() {
    this._crop();
  }

  /**
   * Trigger when Rotate button is pressed
   */
  async onPressRotate() {
    console.log(this.state.rotation + 90);
    await this._rotateTo(this.state.rotation + 90);
  }

  /**
   * Trigger when Crop button is pressed
   */
  async onPressCrop() {
    await this._crop();
    this.props.onCrop(this.state.croppedData);
    await sleep();
    this._closeDialog();
  }

  /**
   * Trigger when Cancel button is pressed
   */
  async onPressCancel() {
    await this._closeDialog();
  }

  render() {
    const { classes } = this.props;
    const actionButtons = [
      {
        text: 'Preview',
        icon: 'remove_red_eye',
        onClick: this.onPressPreview,
      },
      {
        text: 'Rotate',
        icon: 'crop_rotate',
        onClick: this.onPressRotate,
      },
      {
        text: 'Crop',
        icon: 'crop',
        onClick: this.onPressCrop,
      },
      {
        text: 'Cancel',
        icon: 'close',
        onClick: this.onPressCancel,
        color: 'default',
      },
    ];
    return [
      this.props.buttonComponent ? (
        <div key={1} onClick={this._openFilePickerDialog}>
          {this.props.buttonComponent}
        </div>
      ) : (
        <Button
          key={1}
          color={'primary'}
          raised
          style={{ width: '100%' }}
          {...this.props.buttonProps}
          onClick={this._openFilePickerDialog}
        >
          {this.props.buttonText}
        </Button>
      ),
      <input
        key={2}
        type="file"
        ref={ref => {
          this.input = ref;
        }}
        style={{ display: 'none' }}
        onChange={this._onImagePicked}
      />,
      <Modal key={3} onClose={this._closeDialog} show={this.state.isOpen}>
        <Card className={classes.modalContainer}>
          <CardContent className={classes.modalContent}>
            <Grid container direction="row">
              {/* Left Container */}
              <Grid item xs={8}>
                <Grid container>
                  <Grid item xs={12}>
                    <h2>Image Cropper</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Cropper
                      ref={ref => {
                        this.cropper = ref;
                      }}
                      className={classes.cropper}
                      // Cropper.js options
                      src={this.state.originData}
                      ready={this._onCropperReady}
                      aspectRatio={this.props.aspectRatio}
                      // Prevent the crop box go out side of the image
                      viewMode={1}
                      rotateTo={this.state.rotation}
                      {...this.props.cropperOptions}
                    />
                  </Grid>
                </Grid>
              </Grid>
              {/* Right Container */}
              <Grid item xs={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <h2>Preview</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <img
                      className={classes.rightContainerImage}
                      src={this.state.croppedData}
                    />
                  </Grid>
                  {actionButtons.map(
                    ({ color, onClick, icon, text }, index) => (
                      <Grid key={index} item xs={12}>
                        <Button
                          className={classes.button}
                          raised
                          color={color || 'primary'}
                          onClick={onClick}
                        >
                          <Icon className={classes.buttonIcon}>{icon}</Icon>
                          {text}
                        </Button>
                      </Grid>
                    ),
                  )}
                </Grid>
              </Grid>
            </Grid>
            <div
              className={classes.loadingBackdrop}
              style={{ display: this.state.ready && 'none' }}
            >
              <CircularProgress className={classes.loadingIcon} />
            </div>
          </CardContent>
        </Card>
      </Modal>,
    ];
  }
}

ImageCropper.propTypes = {
  onCrop: PropTypes.func,
  cropperOptions: PropTypes.object,
  buttonText: PropTypes.string,
  buttonProps: PropTypes.object,
  buttonComponent: PropTypes.element,
  aspectRatio: PropTypes.number,
};

ImageCropper.defaultProps = {
  onCrop: () =>
    console.warn('Please declare onCrop props to retrieve cropper output'),
  buttonText: 'Click here to upload',
  aspectRatio: 1 / 1,
};

export default withStyles(styles)(ImageCropper);
