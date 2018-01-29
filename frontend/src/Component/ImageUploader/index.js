import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Cropper from 'react-cropper';
import withStyles from 'material-ui/styles/withStyles';
import toBase64 from 'Util/toBase64';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import { withNotification } from 'Component/Notification';

import styles from './styles';

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL;

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      uploading: false,
      uploadedFile: null,
      response_url: null,
    };

    this._openFilePickerDialog = this._openFilePickerDialog.bind(this);
    this._onImagePicked = this._onImagePicked.bind(this);
    this._resetValuesToDefault = this._resetValuesToDefault.bind(this);
    this.upload = this.upload.bind(this);
    this._crop = this._crop.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      open: false,
      uploading: false,
      uploadedFile: null,
      response_url: null,
    });
    this.input.value = null;
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  _crop() {
    this.setState({
      response_url: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  upload() {
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', CLOUDINARY_UPLOAD_URL, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    this.setState({
      uploading: true,
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        const response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg

        this.setState({
          response_url: response.secure_url,
          uploading: false,
          open: false,
        });

        const { userId } = this.props;

        this.props.onUpload(userId, response.secure_url);
      }
    };

    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.response_url);
    xhr.send(fd);
    this._resetValuesToDefault();
  }

  _openFilePickerDialog(event) {
    event.preventDefault();
    if (this.props.isDisabled) {
      this.input.click();
    }
    this._resetValuesToDefault();
  }

  async _onImagePicked(event) {
    const { notification } = this.props;
    console.log(event.target.files);
    const file = event.target.files[0];
    console.log(event.target.files);

    if (file.size / 1024 / 1024 > 2) {
      notification.app.warning({
        message: `The picture size can not exceed 2MB.`,
      });
    } else {
      const base64 = await toBase64(file);
      await this.setStateAsync({ uploadedFileUrl: base64 });

      this.setState({ open: true });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  _resetValuesToDefault() {
    this.setState({
      open: false,
      uploading: false,
      uploadedFile: null,
      response_url: null,
    });
    this.input.value = null;
  }

  render() {
    const { classes, children, titleCropper, aspectRatio } = this.props;
    const { open, uploading } = this.state;

    return (
      <div>
        <div onClick={this._openFilePickerDialog}>{children}</div>

        <input
          key={2}
          type="file"
          ref={ref => {
            this.input = ref;
          }}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={this._onImagePicked}
        />

        <Modal open={open} onClose={this._resetValuesToDefault}>
          <Card className={classes.modalContainer}>
            <CardHeader className={classes.cardHeader} title={titleCropper} />
            <CardContent className={classes.cardContent}>
              <Cropper
                ref={node => {
                  this.cropper = node;
                }}
                src={this.state.uploadedFileUrl}
                style={{
                  height: 400,
                  width: 400,
                }}
                // Cropper.js options
                aspectRatio={aspectRatio}
                guides={false}
                crop={this._crop}
              />
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button raised className={classes.button} onClick={this.upload}>
                Apply
              </Button>
            </CardActions>

            <div
              className={classes.loadingBackdrop}
              style={{ display: !uploading && 'none' }}
            >
              <CircularProgress className={classes.loadingIcon} />
            </div>
          </Card>
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  classes: PropTypes.object,
  updateAvatar: PropTypes.func,
  userId: PropTypes.string,
  children: PropTypes.node,
  onUpload: PropTypes.func,
  titleCropper: PropTypes.string,
  aspectRatio: PropTypes.any,
  isDisabled: PropTypes.bool,
};

export default compose(withNotification)(withStyles(styles)(ImageUploader));
