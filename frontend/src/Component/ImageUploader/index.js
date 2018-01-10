import React, { Component } from 'react';
// import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
// import Dropzone from 'react-dropzone';
// import request from 'superagent';
import Cropper from 'react-cropper';
import withStyles from 'material-ui/styles/withStyles';
import Icon from 'material-ui/Icon';
import toBase64 from 'Util//toBase64';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';
import styles from './styles';

const { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } = process.env;

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      uploading: false,
      uploadedFile: null,
      size: {
        width: 200,
        height: 200,
      },
      uploadedFileCloudinaryUrl:
        'https://res.cloudinary.com/cocacode2/image/upload/v1515550702/wwsqbsi7kxcz0zgj70j6.png',
    };

    this._openFilePickerDialog = this._openFilePickerDialog.bind(this);
    this._onImagePicked = this._onImagePicked.bind(this);
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  // onImageDrop(files) {
  //   console.log(files[0]);
  //   this.setState({
  //     uploadedFile: files[0],
  //     uploadedFileUrl: files[0].preview,
  //   });

  // this.handleImageUpload(files[0]);
  // }

  _crop() {
    // image in dataUrl
    // console.log('cropping');
    // console.log(b64toBlob(this.cropper.getCroppedCanvas().toDataURL()));
    this.setState({
      dataUrl: this.cropper.getCroppedCanvas().toDataURL(),
    });

    // console.log(file);
    // this.refs.cropper.getCroppedCanvas().toDataURL();
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
          uploadedFileCloudinaryUrl: response.secure_url,
          uploading: false,
          open: false,
        });
        // Create a thumbnail of the uploaded image, with 150px width
        // const tokens = url.split('/');
        // tokens.splice(-2, 0, 'w_150,c_scale');
        // const img = new Image(); // HTML5 Constructor
        // img.src = tokens.join('/');
        // img.alt = response.public_id;
        // document.body.appendChild(img);
      }
    };

    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.dataUrl);
    xhr.send(fd);
  }

  _openFilePickerDialog(event) {
    event.preventDefault();
    this.input.click();
  }

  async _onImagePicked(event) {
    const file = event.target.files[0];
    console.log(file);
    const base64 = await toBase64(file);
    await this.setStateAsync({ uploadedFileUrl: base64 });

    this.setState({ open: true });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <form>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              multiple={false}
              accept="image/*"
            >
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null : (
                  <div>
                    <img
                      style={{ width: 200, height: 200 }}
                      src={this.state.uploadedFileCloudinaryUrl}
                    />
                  </div>
                )}
              </div>
            </Dropzone>
          </div>
        </form> */}
        <div className={classes.avatar} style={this.state.size}>
          <div className="hoverButton" onClick={this._openFilePickerDialog}>
            <Icon className={classes.uploadIcon}>camera_alt</Icon>
            <p>Upload profile photo</p>
          </div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null : (
            <div>
              <img
                style={this.state.size}
                src={this.state.uploadedFileCloudinaryUrl}
              />
            </div>
          )}
        </div>
        <input
          key={2}
          type="file"
          ref={ref => {
            this.input = ref;
          }}
          style={{ display: 'none' }}
          onChange={this._onImagePicked}
        />

        <Modal open={this.state.open} onClose={this.handleClose}>
          <Card className={classes.modalContainer}>
            <CardHeader title="Crop your new profile photo" />
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
                aspectRatio={1 / 1}
                guides={false}
                crop={this._crop.bind(this)}
              />
            </CardContent>
            <CardActions>
              <Button onClick={this.upload.bind(this)}> Apply </Button>
            </CardActions>

            <div
              className={classes.loadingBackdrop}
              style={{ display: !this.state.uploading && 'none' }}
            >
              <CircularProgress className={classes.loadingIcon} />
            </div>
          </Card>
          {/* <div>
            <Button onClick={this.upload.bind(this)}> Apply </Button>
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
              aspectRatio={1 / 1}
              guides={false}
              crop={this._crop.bind(this)}
            />
          </div> */}
        </Modal>
      </div>
    );
  }
}

ImageUploader.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(ImageUploader);
