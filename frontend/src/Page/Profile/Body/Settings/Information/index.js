import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, Form } from 'redux-form';
import { maxLength15, required } from 'Util/validate';
import { TextView } from 'Component';
import { withStyles } from 'material-ui/styles/index';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import { FormHelperText } from 'material-ui/Form';
import { withRouter } from 'react-router';
import { setUsername, setUserInformation } from 'Redux/api/userProfile/actions';
import styles from '../styles';

class Information extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: '',
    };

    this._renderChangeInformationForm = this._renderChangeInformationForm.bind(
      this,
    );
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
    this._submitModal = this._submitModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // const { information: { message } } = nextProps;
    // console.log(nextProps);
    const { user: { username } } = nextProps;
    console.log(username);
    if (username !== this.props.user.username) {
      this.props.history.push(`/profile/${username}`);
    }
    // if (message !== null) {
    //   this.setState({
    //     formErrors: message,
    //   });
    // }
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderChangeInformationForm() {
    const { classes, submitSucceeded } = this.props;
    return [
      <Field
        key={1}
        name="username"
        placeholder="Username"
        type="text"
        component={TextView}
        label="Username"
        validate={[required]}
      />,
      <Field
        key={2}
        name="name"
        placeholder="Display name"
        type="text"
        component={TextView}
        label="Display name"
        validate={[required, maxLength15]}
      />,
      <Field
        key={3}
        name="email"
        placeholder="Email"
        type="email"
        component={TextView}
        label="Email"
        disabled
      />,
      <Field
        key={4}
        name="firstname"
        placeholder="First name"
        type="text"
        component={TextView}
        label="First name"
      />,
      <Field
        key={5}
        name="lastname"
        placeholder="Last name"
        type="text"
        component={TextView}
        label="Last name"
      />,
      <Field
        key={6}
        name="bio"
        placeholder="Bio"
        type="text"
        component={TextView}
        label="Bio"
      />,
      <Field
        key={7}
        name="city"
        placeholder="City"
        type="text"
        component={TextView}
        label="City"
      />,
      <Field
        key={8}
        name="country"
        placeholder="Country"
        type="text"
        component={TextView}
        label="Country"
      />,
      <FormHelperText key={10} className={classes.error}>
        {submitSucceeded && this.state.formErrors}
      </FormHelperText>,
    ];
  }

  _submitModal(values) {
    const { onSubmit, initialValues } = this.props;
    // console.log(initialValues);
    onSubmit({ userId: initialValues.userId, ...values });
    if (this.state.formErrors !== '') {
      this.props.onDone();
    }
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <Grid className={classes.content}>
        <form onSubmit={handleSubmit(this._submitModal)}>
          <Grid item xs={12}>
            {this._renderChangeInformationForm()}
          </Grid>
          <Grid item xs={12} className={classes.modalFooter}>
            <Button onClick={this._onCancelButtonClick}>Cancel</Button>
            <Button
              raised
              disabled={pristine || submitting}
              color="primary"
              type="submit"
            >
              Save changes
            </Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  initialValues: api.userProfile.data,
  // information: api.userProfile.information.data,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({
    userId,
    username,
    name,
    firstname,
    lastname,
    bio,
    city,
    country,
  }) => {
    dispatch(
      setUsername({
        userId,
        username,
      }),
    );
    dispatch(
      setUserInformation({
        userId,
        name,
        firstname,
        lastname,
        bio,
        city,
        country,
      }),
    );
  },
});

Information.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editProfileInformationForm',
    enableReinitialize: true,
  }),
)(Information);
