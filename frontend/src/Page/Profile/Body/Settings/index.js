import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, Form } from 'redux-form';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';
import Modal from 'material-ui/Modal';
import { FormHelperText } from 'material-ui/Form';
import Typography from 'material-ui/Typography';
import CircularProgress from 'material-ui/Progress/CircularProgress';

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
import { connect } from 'react-redux';

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
    this._onOpenModal = this._onOpenModal.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._renderChangeInformationForm = this._renderChangeInformationForm.bind(
      this,
    );
    this._renderChangePasswordForm = this._renderChangePasswordForm.bind(this);
    this._onSaveChangesButtonClick = this._onSaveChangesButtonClick.bind(this);
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
  }

  handleChange(event, value) {
    this.setState({ value });
  }

  _onOpenModal() {
    this.setState({ open: true });
  }

  _onCloseModal() {
    this.setState({ open: false });
  }

  _onSaveChangesButtonClick() {
    console.log('_onSaveChangesButtonClick');
  }

  _onCancelButtonClick() {
    console.log('_onCancelButtonClick');
  }

  _renderSecondItem() {
    const { classes } = this.props;
    return () => (
      <div className={classes.secondButton}>
        <img width="150" height="150" src={this.state.secondSource} alt="" />
      </div>
    );
  }

  _renderChangeInformationForm(user) {
    const { classes, submitSucceeded } = this.props;

    return [
      <Field
        key={1}
        name="username"
        placeholder="Your username"
        type="text"
        component={TextView}
        label="Username"
        validate={[required]}
        border
        initialValues={'test'}
      />,
      <Field
        key={2}
        name="name"
        placeholder="Display name"
        type="text"
        component={TextView}
        label="Display name"
        validate={[required, maxLength15]}
        border
      />,
      <Field
        key={3}
        name="email"
        placeholder="Email"
        type="email"
        component={TextView}
        label="Email"
        border
        disabled
      />,
      <Field
        key={4}
        name="level"
        placeholder="Level"
        type="text"
        component={TextView}
        label="Level"
        border
        disabled
      />,
      <FormHelperText key={5} className={classes.error}>
        {submitSucceeded && this.state.asyncError}
      </FormHelperText>,
    ];
  }

  _renderChangePasswordForm(user) {
    const { classes, submitSucceeded } = this.props;
    return [
      <Field
        key={1}
        name="password"
        placeholder="Old password"
        type="password"
        component={TextView}
        label="Your password"
        validate={[required, maxLength15]}
        border
      />,
      <Field
        key={3}
        name="password"
        placeholder="New password"
        type="password"
        component={TextView}
        label="Your password"
        validate={[required, maxLength15]}
        border
      />,
      <Field
        key={4}
        name="confirmPassword"
        placeholder="New password confirm"
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

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, handleSubmit, user } = this.props;

    if (!user) {
      return this._renderLoading();
    }

    const SecondButton = this._renderSecondItem();
    return [
      <Button
        // raised
        // color={}
        onClick={this._onOpenModal}
        // disabled={!this.state.stationName}
        key={1}
      >
        <Icon className={classes.icon}>edit</Icon>
      </Button>,
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this._onCloseModal}
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
            {/* <form onSubmit={handleSubmit} className={classes.formInformation}> */}
            {this.state.value === 0 && (
              <TabContainer>
                <Grid item xs={12} className={classes.content}>
                  <Form
                    onSubmit={handleSubmit}
                    className={classes.formInformation}
                  >
                    {this._renderChangeInformationForm(user)}
                  </Form>
                </Grid>
              </TabContainer>
            )}
            {this.state.value === 1 && (
              <TabContainer>
                <form
                  onSubmit={handleSubmit}
                  className={classes.formInformation}
                >
                  {this._renderChangePasswordForm(user)}
                </form>
              </TabContainer>
            )}
            {/* </form>, */}
            <Grid item xs={12} className={classes.modalFooter}>
              <Button
                raised
                // color={'#808080'}
                onClick={this._onCancelButtonClick}
                // className={classes.buttonCover}
                // disabled={!this.state.stationName}
              >
                Cancel
              </Button>
              <Button
                // raised
                onClick={this._onSaveChangesButtonClick}
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
const mapStateToProps = state => ({
  initialValues: state.api.user.data,
});

Settings.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({
    form: 'editProfileForm',
    enableReinitialize: true,
  }),
)(Settings);
