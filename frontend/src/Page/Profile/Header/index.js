import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
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

  _renderHeader() {
    const { classes, user } = this.props;

    return (
      <div className={classes.coverBackground}>
        <div className={classes.userInformationContainer}>
          <ImageUploader user={user} />
          <div className={classes.userInformationContent}>
            <Typography type="headline" className={classes.text}>
              {user.name}
            </Typography>
            <Typography className={classes.text}>@{user.username}</Typography>
          </div>

          <div className={classes.summarize}>
            <div className={classes.summarizeItem}>
              <Typography type="subheading" className={classes.text}>
                Songs
              </Typography>
              <Typography type="body2" className={classes.number}>
                0
              </Typography>
            </div>

            <div className={classes.summarizeItem}>
              <Typography type="subheading" className={classes.text}>
                Voted
              </Typography>
              <Typography type="body2" className={classes.number}>
                0
              </Typography>
            </div>

            <div className={classes.summarizeItem}>
              <Typography type="subheading" className={classes.text}>
                Score
              </Typography>
              <Typography type="body2" className={classes.number}>
                {user.reputation}
              </Typography>
            </div>
          </div>
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
    );
  }

  render() {
    const { classes, loading } = this.props;

    if (loading) {
      return this._renderLoading();
    }

    return (
      <Grid container className={classes.coverContainer}>
        <Grid container className={classes.coverWrapper}>
          {this._renderHeader()}
        </Grid>
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.any,
  loading: PropTypes.bool,
};

Header.defaultProps = {
  user: {},
  loading: false,
};

export default compose(withStyles(styles))(Header);
