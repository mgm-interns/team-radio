import React, { Component } from 'react';
import withStyles from 'material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import { Images } from 'Theme';
import { connect } from 'react-redux';
import { setAvatar } from 'Redux/api/user/profile';
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
    this.setState({ avatar_url: this.props.avatarUrl });
  }

  upload(userId, response_url) {
    this.props.updateAvatar(userId, response_url);
  }

  render() {
    const { classes, userId, avatarUrl, isDisabled } = this.props;
    const titleCropper = 'Crop your new profile photo';
    const aspectRatio = 1;

    return (
      <ImageUploader
        userId={userId}
        titleCropper={titleCropper}
        aspectRatio={aspectRatio}
        onUpload={this.upload}
        isDisabled={isDisabled}
      >
        <div className={classes.avatarContainer}>
          <div className={classes.avatarWrapper}>
            {isDisabled && (
              <div className="hoverButton">
                <Icon className={classes.uploadIcon}>camera_alt</Icon>
                <p style={{ textAlign: 'center' }}>Upload profile photo</p>
              </div>
            )}
            <Avatar
              className={classes.avatar}
              src={!avatarUrl ? Images.avatar.male01 : avatarUrl}
            />
          </div>
        </div>
      </ImageUploader>
    );
  }
}

UserAvatar.propTypes = {
  classes: PropTypes.object,
  updateAvatar: PropTypes.func,
  isDisabled: PropTypes.bool,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  updateAvatar: (userId, avatar_url) =>
    dispatch(setAvatar({ userId, avatar_url })),
});

export default compose(
  connect(
    undefined,
    mapDispatchToProps,
  ),
)(withStyles(styles)(UserAvatar));
