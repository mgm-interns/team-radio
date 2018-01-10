import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Modal from 'material-ui/Modal';
import { FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';

import { ImageCropper, TextView, TabContainer } from 'Component';

import {
  customValidate,
  required,
  email,
  minLength6,
  maxLength15,
} from 'Util/validate';

import { Images } from 'Theme';
import styles from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    width: '35vw',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 8 * 4,
  };
}

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      open: false,
      secondSource:
        'http://www.followingthenerd.com/site/wp-content/uploads/avatar.jpg_274898881.jpg',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this._renderChangeInformationForm = this._renderChangeInformationForm.bind(this);
    this._renderChangePasswordForm = this._renderChangePasswordForm.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  _renderSecondItem() {
    const { classes } = this.props;
    return () => (
      <div className={classes.secondButton}>
        <img width="150" height="150" src={this.state.secondSource} alt="" />
      </div>
    );
  }

  _renderChangeInformationForm() {
    const { classes, submitSucceeded } = this.props;
    return [
      <Field
        key={1}
        name="fullname"
        placeholder="Full name"
        type="text"
        component={TextView}
        label="Full name"
        validate={[required, maxLength15]}
        border
      />,
      <Field
        key={2}
        name="username"
        placeholder="Your username"
        type="text"
        component={TextView}
        label="Username"
        validate={[required]}
        border
      />,
      <FormHelperText key={5} className={classes.error}>
        {submitSucceeded && this.state.asyncError}
      </FormHelperText>,
    ];
  }

  _renderChangePasswordForm() {
    const { classes, submitSucceeded } = this.props;
    return [
      <Field
        key={1}
        name="password"
        placeholder="Your password"
        type="password"
        component={TextView}
        label="Your password"
        validate={[required, maxLength15]}
        border
      />,
      <Field
        key={2}
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        component={TextView}
        label="Confirm password"
        validate={[required]}
        border
      />,
      <FormHelperText key={5} className={classes.error}>
        {submitSucceeded && this.state.asyncError}
      </FormHelperText>,
    ];
  }

  render() {
    const { classes, handleSubmit } = this.props;
    const SecondButton = this._renderSecondItem();
    return [
      <Button
        // raised
        // color={}
        onClick={this.handleOpen}
        // disabled={!this.state.stationName}
        key={1}
      >
        <Icon>settings</Icon>
      </Button>,
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
        key={2}
      >
        <div style={getModalStyle()}>
          <Grid container>
            <Grid item xs={12} className={classes.modalHeadline}>
              Edit your Account
            </Grid>
            <div className="line" />
            <Grid item xs={12} className={classes.settingTabs}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Information" />
                <Tab label="Security" />
              </Tabs>
            </Grid>,
            {this.state.value === 0 && (
              <TabContainer>
                <Grid item xs={12} className={classes.content}>
                  <ImageCropper
                    buttonComponent={<SecondButton />}
                    onCrop={secondSource => this.setState({ secondSource })}
                    aspectRatio={1}
                  />
                  <form
                    onSubmit={handleSubmit}
                    className={classes.formInformation}
                  >
                    {this._renderChangeInformationForm()}
                  </form>
                </Grid>
              </TabContainer>
            )}
            {this.state.value === 1 && (
              <TabContainer>
                <form
                  onSubmit={handleSubmit}
                  className={classes.formInformation}
                >
                  {this._renderChangePasswordForm()}
                </form>
              </TabContainer>
            )}
            <Grid item xs={12} className={classes.modalFooter}>
              <Button
              // raised
              // color={}
              // onClick={this.handleOpen}
              // className={classes.buttonCover}
              // disabled={!this.state.stationName}
              >
                Cancel
              </Button>
              <Button
              // raised
              // color={}
              // onClick={this.handleOpen}
              // className={classes.buttonCover}
              // disabled={!this.state.stationName}
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>,
    ];
  }
}

Settings.propTypes = {
  classes: PropTypes.any,
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: 'editProfileForm',
    // validate: customValidate,
  }),
)(Settings);
