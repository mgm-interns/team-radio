import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';
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
import Menu, { MenuItem } from 'material-ui/Menu';

import { TabContainer } from 'Component';
import { withRouter } from 'react-router';

import {
  customValidate,
  required,
  email,
  minLength6,
  maxLength15,
} from 'Util/validate';

import { Images } from 'Theme';
import styles from './styles';

import Information from './Information';
import Security from './Security';

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
      // value: 0,
      openEditInformation: false,
      openEditSecurity: false,
      // secondSource:
      //   'http://www.followingthenerd.com/site/wp-content/uploads/avatar.jpg_274898881.jpg',
    };

    this._renderEditInformation = this._renderEditInformation.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this._onOpenEditInformation = this._onOpenEditInformation.bind(this);
    this._onOpenEditSecurity = this._onOpenEditSecurity.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
  }

  onCancelButtonClick() {
    this.setState({
      openEditInformation: !this.state.openEditInformation,
      openEditSecurity: !this.state.openEditSecurity,
    });
  }

  // handleChange(event, value) {
  //   this.setState({ value });
  // }

  _onOpenEditInformation() {
    this.setState({ openEditInformation: true });
  }

  _onOpenEditSecurity() {
    this.setState({ openEditSecurity: true });
  }

  _onCloseModal() {
    this.setState({
      openEditInformation: false,
      openEditSecurity: false,
    });
  }

  _renderSecondItem() {
    const { classes } = this.props;
    return () => (
      <div className={classes.secondButton}>
        <img width="150" height="150" src={this.state.secondSource} alt="" />
      </div>
    );
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  _renderEditInformation() {
    const { classes, user } = this.props;
    return [
      <Button key={1} onClick={this._onOpenEditInformation}>
        <Icon>edit</Icon>
      </Button>,
      <Modal
        key={2}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openEditInformation}
        onClose={this._onCloseModal}
      >
        <div style={getModalStyle()}>
          <Grid container>
            <Grid item xs={12} className={classes.modalHeadline}>
              Edit your Information
            </Grid>
            <div className="line" />
            <Grid item xs={12} className={classes.settingTabs}>
              <Information user={user} onCancel={this.onCancelButtonClick} />
            </Grid>
          </Grid>
        </div>
      </Modal>,
    ];
  }

  _renderEditSecurity() {
    const { classes, user } = this.props;
    return [
      <Button key={1} onClick={this._onOpenEditSecurity}>
        <Icon>settings</Icon>
      </Button>,
      <Modal
        key={2}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openEditSecurity}
        onClose={this._onCloseModal}
      >
        <div style={getModalStyle()}>
          <Grid container>
            <Grid item xs={12} className={classes.modalHeadline}>
              Edit your Security
            </Grid>
            <div className="line" />
            <Grid item xs={12} className={classes.settingTabs}>
              <Security user={user} onCancel={this.onCancelButtonClick} />
            </Grid>
          </Grid>
        </div>
      </Modal>,
    ];
  }

  render() {
    const { classes, loading, user } = this.props;

    if (loading) {
      return this._renderLoading();
    }

    return this._renderEditInformation();
  }
}

Settings.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.any,
  loading: PropTypes.bool,
};

export default compose(withStyles(styles), withRouter)(Settings);
