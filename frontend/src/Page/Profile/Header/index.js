import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import ImageUploader from 'Component/ImageUploader';
import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  _renderHeader(user) {
    const { classes } = this.props;
    // console.log(user.avatar_url);
    // const data = user.data.user;

    return (
      <Grid item xs={12} md={7} xl={8} className={classes.coverWrapper}>
        <div className={classes.coverBackground}>
          <div className={classes.userInformation}>
            <ImageUploader avatarUrl={user.avatar_url} />
            <div>
              <Typography type="headline" className={classes.text}>
                {user.name}
              </Typography>
              <Typography className={classes.text}>@{user.username}</Typography>
            </div>

            {/* <div className={classes.summarize}> */}
            {/* <div className={classes.summarizeItem}> */}
            {/* <Typography type="headline" className={classes.text}> */}
            {/* Songs */}
            {/* </Typography> */}
            {/* <Typography type="subheading" className={classes.number}> */}
            {/* 52 */}
            {/* </Typography> */}
            {/* </div> */}

            {/* <div className={classes.summarizeItem}> */}
            {/* <Typography type="headline" className={classes.text}> */}
            {/* Votes */}
            {/* </Typography> */}
            {/* <Typography type="subheading" className={classes.number}> */}
            {/* 3 */}
            {/* </Typography> */}
            {/* </div> */}

            {/* <div className={classes.summarizeItem}> */}
            {/* <Typography type="headline" className={classes.text}> */}
            {/* Score */}
            {/* </Typography> */}
            {/* <Typography type="subheading" className={classes.number}> */}
            {/* 0 */}
            {/* </Typography> */}
            {/* </div> */}
            {/* </div> */}
          </div>

          {/* <Button */}
          {/* raised */}
          {/* // color={} */}
          {/* className={classes.buttonCover} */}
          {/* // disabled={!this.state.stationName} */}
          {/* > */}
          {/* <Icon className={classes.icon}>edit</Icon> */}
          {/* Change Cover */}
          {/* </Button> */}
        </div>
      </Grid>
    );
  }

  render() {
    const { classes, user } = this.props;

    if (!user) {
      this._renderLoading();
    }

    return (
      <Grid container className={classes.coverContainer}>
        {this._renderHeader(user)}
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
};

export default compose(withStyles(styles))(Header);
