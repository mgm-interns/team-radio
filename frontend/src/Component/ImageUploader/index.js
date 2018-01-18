import React, { Component, Fragment } from 'react';
import Cropper from 'react-cropper';
import withStyles from 'material-ui/styles/withStyles';
import Icon from 'material-ui/Icon';
import toBase64 from 'Util//toBase64';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import { CircularProgress } from 'material-ui/Progress';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { Images } from 'Theme';
import { connect } from 'react-redux';
import { setAvatar } from 'Redux/api/user/profile';
import { withNotification } from 'Component/Notification';
import { compose } from 'redux';
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
      // avatar_url:
      //   'https://res.cloudinary.com/cocacode2/image/upload/v1515550702/wwsqbsi7kxcz0zgj70j6.png',
      avatar_url: null,
    };

    this._openFilePickerDialog = this._openFilePickerDialog.bind(this);
    this._onImagePicked = this._onImagePicked.bind(this);
  }

  componentDidMount() {
    this.setState({ avatar_url: this.props.user.avatar_url });
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  _crop() {
    this.setState({
      avatar_url: this.cropper.getCroppedCanvas().toDataURL(),
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
          avatar_url: response.secure_url,
          uploading: false,
          open: false,
        });
        const { user: { userId } } = this.props;
        console.log(userId);
        this.props.updateAvatar(userId, response.secure_url);
      }
    };

    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', this.state.avatar_url);
    xhr.send(fd);
  }

  _openFilePickerDialog(event) {
    event.preventDefault();
    if (this.props.isDisabled) {
      this.input.click();
    }
  }

  async _onImagePicked(event) {
    const { notification } = this.props;
    const file = event.target.files[0];
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

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, user: { avatar_url }, isDisabled } = this.props;
    return (
      <div>
        <div className={classes.avatarContainer} style={this.state.size}>
          <div className="hoverButton" onClick={this._openFilePickerDialog}>
            {isDisabled && (
              <Fragment>
                <Icon className={classes.uploadIcon}>camera_alt</Icon>
                <p style={{ textAlign: 'center' }}>Upload profile photo</p>
              </Fragment>
            )}
          </div>
          <div>
            <Avatar
              className={classes.avatar}
              src={!avatar_url ? Images.avatar.male01 : avatar_url}
            />
          </div>
        </div>
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

        <Modal open={this.state.open} onClose={this.handleClose}>
          <Card className={classes.modalContainer}>
            <CardHeader
              className={classes.cardHeader}
              title="Crop your new profile photo"
            />
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
            <CardActions className={classes.cardActions}>
              <Button
                raised
                // color={}
                className={classes.button}
                onClick={this.upload.bind(this)}
              >
                Apply
              </Button>
            </CardActions>

            <div
              className={classes.loadingBackdrop}
              style={{ display: !this.state.uploading && 'none' }}
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
  classes: PropTypes.any,
  avatar_url: PropTypes.any,
  updateAvatar: PropTypes.any,
  isDisabled: PropTypes.any,
};

// const mapStateToProps = state => ({
//   userData: state.api.user.data,
// });

const mapDispatchToProps = dispatch => ({
  updateAvatar: (userId, avatar_url) =>
    dispatch(setAvatar({ userId, avatar_url })),
});

export default compose(withNotification, connect(null, mapDispatchToProps))(
  withStyles(styles)(ImageUploader),
);
