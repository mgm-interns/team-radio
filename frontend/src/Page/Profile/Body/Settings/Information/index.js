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

import { updateUsername } from 'Redux/api/user/actions';
import styles from '../styles';

class Information extends Component {
  constructor(props) {
    super(props);

    this._renderChangeInformationForm = this._renderChangeInformationForm.bind(
      this,
    );
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
  }

  _onCancelButtonClick() {
    this.props.onCancel();
  }

  _renderChangeInformationForm() {
    return [
      <Field
        key={1}
        name="username"
        placeholder="Profile URL"
        type="text"
        component={TextView}
        label="Profile URL"
        validate={[required]}
        border
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
        disabled
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
    ];
  }

  render() {
    const { classes, handleSubmit, pristine, submitting } = this.props;

    return (
      <Grid className={classes.content}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} className={classes.formInformation}>
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

const mapStateToProps = state => ({
  initialValues: state.api.user.data,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ username }) => dispatch(updateUsername(username)),
});

Information.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
  onCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editProfileInformationForm',
    enableReinitialize: true,
  }),
)(Information);
