import React, { Component, Fragment } from 'react';
import withStyles from 'material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import { Images } from 'Theme';
import { connect } from 'react-redux';
import { setAvatar } from 'Redux/api/user/profile';
import { withNotification } from 'Component/Notification';
import ImageUploader from 'Component/ImageUploader';
import { compose } from 'redux';
import styles from './styles';

class UserAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar_url: null,
    };

    this.upload = this.upload.bind(this);
  }

  componentDidMount() {
    this.setState({ avatar_url: this.props.user.avatar_url });
  }

  upload(userId, response_url) {
    console.log('uploaded');
    console.log(userId, response_url);
    this.props.updateAvatar(userId, response_url);
  }

  render() {
    const { classes, user, isDisabled } = this.props;
    const titleCropper = 'Crop your new profile photo';
    const aspectRatio = 1;

    console.log('render', isDisabled);

    return (
      <ImageUploader
        user={user}
        titleCropper={titleCropper}
        aspectRatio={aspectRatio}
        onUpload={this.upload}
        isDisabled={isDisabled}
      >
        <div className={classes.avatarContainer}>
          <div className={classes.avatarWrapper}>
            <div className="hoverButton">
              <Icon className={classes.uploadIcon}>camera_alt</Icon>
              <p style={{ textAlign: 'center' }}>Upload profile photo</p>
            </div>
            <Avatar
              className={classes.avatar}
              src={!user.avatar_url ? Images.avatar.male01 : user.avatar_url}
            />
          </div>
        </div>
      </ImageUploader>
    );
  }
}

UserAvatar.propTypes = {
  classes: PropTypes.any,
  updateAvatar: PropTypes.any,
  isDisabled: PropTypes.any,
  user: PropTypes.any,
};

const mapDispatchToProps = dispatch => ({
  updateAvatar: (userId, avatar_url) =>
    dispatch(setAvatar({ userId, avatar_url })),
});

export default compose(
  withNotification,
  connect(undefined, mapDispatchToProps),
)(withStyles(styles)(UserAvatar));