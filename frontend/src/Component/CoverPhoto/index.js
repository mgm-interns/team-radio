import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import withStyles from 'material-ui/styles/withStyles';
import CameraIcon from 'react-icons/lib/md/camera-alt';
import Button from 'material-ui/Button';

import { setCover } from 'Redux/api/user/profile';

import { withNotification } from 'Component/Notification';
import ImageUploader from 'Component/ImageUploader';
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
    this.setState({ cover_url: this.props.coverUrl });
  }

  upload(userId, response_url) {
    this.props.uploadCover(userId, response_url);
  }

  render() {
    const { classes, userId, isDisabled } = this.props;
    const titleCropper = 'Crop your new cover photo';
    const aspectRatio = 16 / 9;

    return (
      <ImageUploader
        userId={userId}
        titleCropper={titleCropper}
        aspectRatio={aspectRatio}
        onUpload={this.upload}
        isDisabled={isDisabled}
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
  classes: PropTypes.object,
  isDisabled: PropTypes.bool,
  userId: PropTypes.string,
  coverUrl: PropTypes.string,
  uploadCover: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  uploadCover: (userId, cover_url) => dispatch(setCover({ userId, cover_url })),
});

export default compose(
  withNotification,
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(withStyles(styles)(CoverPhoto));
