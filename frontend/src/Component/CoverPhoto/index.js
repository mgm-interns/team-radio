import React, { Component } from 'react';
import withStyles from 'material-ui/styles/withStyles';
import CameraIcon from 'react-icons/lib/md/camera-alt';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Images } from 'Theme';
import { connect } from 'react-redux';
import { setCover } from 'Redux/api/user/profile';
import { withNotification } from 'Component/Notification';
import ImageUploader from 'Component/ImageUploader';
import { compose } from 'redux';
import styles from './styles';

class CoverPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover_url: null,
    };

    this.upload = this.upload.bind(this);
  }

  componentDidMount() {
    this.setState({ cover_url: this.props.user.cover_url });
  }

  upload(userId, response_url) {
    console.log(userId, response_url);
    this.props.uploadCover(userId, response_url);
  }

  render() {
    const { classes, user } = this.props;
    const titleCropper = 'Crop your new cover photo';
    const aspectRatio = 16 / 9;

    return (
      <ImageUploader
        user={user}
        titleCropper={titleCropper}
        aspectRatio={aspectRatio}
        onUpload={this.upload}
      >
        <Button
          raised
          className={classes.icon}
          onClick={this._openFilePickerDialog}
        >
          <CameraIcon />
          <span style={{ paddingLeft: 8, textTransform: 'none' }}>
            {'Update cover photo'}
          </span>
        </Button>
      </ImageUploader>
    );
  }
}

CoverPhoto.propTypes = {
  classes: PropTypes.any,
  updateAvatar: PropTypes.any,
  isDisabled: PropTypes.any,
  user: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  uploadCover: (userId, cover_url) => dispatch(setCover({ userId, cover_url })),
});

export default compose(
  withNotification,
  connect(undefined, mapDispatchToProps),
)(withStyles(styles)(CoverPhoto));
