import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import ImageUploader from 'Component/ImageUploader';
import styles from './styles';

class Header extends Component {
  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
  }

  _renderHeader() {
    const { classes } = this.props;

    return (
      <Grid item xs={12} md={7} xl={8} className={classes.coverWrapper}>
        <div className={classes.coverBackground}>
          <div className={classes.userInformation}>
            <ImageUploader />
            <div>
              <Typography type="headline" className={classes.text}>
                mars
              </Typography>
              <Typography className={classes.text}>@lybaokhanh</Typography>
            </div>

            <div className={classes.summarize}>
              <div className={classes.summarizeItem}>
                <Typography type="headline" className={classes.text}>
                  Songs
                </Typography>
                <Typography type="subheading" className={classes.number}>
                  52
                </Typography>
              </div>

              <div className={classes.summarizeItem}>
                <Typography type="headline" className={classes.text}>
                  Votes
                </Typography>
                <Typography type="subheading" className={classes.number}>
                  3
                </Typography>
              </div>

              <div className={classes.summarizeItem}>
                <Typography type="headline" className={classes.text}>
                  Score
                </Typography>
                <Typography type="subheading" className={classes.number}>
                  0
                </Typography>
              </div>
            </div>
          </div>

          <Button
            raised
            // color={}
            className={classes.buttonCover}
            // disabled={!this.state.stationName}
          >
            <Icon className={classes.icon}>edit</Icon>
            Change Cover
          </Button>
        </div>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.coverContainer}>
        {this._renderHeader()}
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.any,
};

export default compose(withStyles(styles))(Header);
