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
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { TabContainer } from 'Component';
import { withNotification } from 'Component/Notification';
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
import Password from './Password';

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
      openEditInformation: false,
      openEditPassword: false,
      anchorEl: null,
    };

    this._renderEditInformation = this._renderEditInformation.bind(this);
    this._onOpenEditInformation = this._onOpenEditInformation.bind(this);
    this._onOpenEditPassword = this._onOpenEditPassword.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._submitModal = this._submitModal.bind(this);
    this._showNotification = this._showNotification.bind(this);
  }

  _showNotification(content) {
    const { notification } = this.props;

    notification.app.success({
      message: content,
    });
    // notification.browser.success({
    //   message: content,
    // });
  }

  onCancelButtonClick() {
    this.setState({
      openEditInformation: false,
      openEditPassword: false,
    });
    this._closeMenu();
  }

  _onOpenEditInformation() {
    this._closeMenu();
    this.setState({ openEditInformation: true, openEditPassword: false });
  }

  _onOpenEditPassword() {
    this._closeMenu();
    this.setState({ openEditInformation: false, openEditPassword: true });
  }

  _onCloseModal() {
    this.setState({
      openEditInformation: false,
      openEditPassword: false,
    });
    this._closeMenu();
  }

  _openMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  _closeMenu() {
    this.setState({ anchorEl: null });
  }

  _submitModal() {
    const { user } = this.props;
    this._onCloseModal();
    this._showNotification('Your information has been changed successfully!');
  }

  _renderLoading() {
    return <CircularProgress />;
  }

  _renderEditInformation() {
    const { classes, user, loading } = this.props;
    return (
      <Modal
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
              <Information
                user={user}
                loading={loading}
                onCancel={this.onCancelButtonClick}
                onDone={this._submitModal}
              />
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }

  _renderEditPassword() {
    const { classes, user, loading } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.openEditPassword}
        onClose={this._onCloseModal}
      >
        <div style={getModalStyle()}>
          <Grid container>
            <Grid item xs={12} className={classes.modalHeadline}>
              Edit your Password
            </Grid>
            <div className="line" />
            <Grid item xs={12} className={classes.settingTabs}>
              <Password
                user={user}
                loading={loading}
                onCancel={this.onCancelButtonClick}
                onDone={this._submitModal}
              />
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }

  render() {
    const { classes, loading } = this.props;
    const { anchorEl } = this.state;

    if (loading) {
      return this._renderLoading();
    }

    return (
      <div>
        <div
          className={classes.menuItem}
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this._openMenu}
        >
          <Button key={1}>
            <Icon>edit</Icon>
          </Button>
        </div>

        <Menu
          id="simple-menu"
          className={classes.menuPopover}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._closeMenu}
        >
          <List>
            <ListItem button onClick={this._onOpenEditInformation}>
              <ListItemIcon>
                <Icon>personal</Icon>
              </ListItemIcon>
              <ListItemText primary="Information" />
            </ListItem>
            <ListItem button onClick={this._onOpenEditPassword}>
              <ListItemIcon>
                <Icon>vpn_key</Icon>
              </ListItemIcon>
              <ListItemText primary="Password" />
            </ListItem>
          </List>
        </Menu>
        {this._renderEditInformation()}
        {this._renderEditPassword()}
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.any,
  loading: PropTypes.bool,
};

export default compose(withStyles(styles), withRouter, withNotification)(Settings);
