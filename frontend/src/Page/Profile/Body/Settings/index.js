import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'react-icons/lib/md/edit';
import PersonIcon from 'react-icons/lib/md/person';
import KeyIcon from 'react-icons/lib/md/vpn-key';
import Modal from 'material-ui/Modal';
import CircularProgress from 'material-ui/Progress/CircularProgress';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';

import styles from './styles';

import Information from './Information';
import Password from './Password';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditInformation: false,
      openEditPassword: false,
      anchorEl: null,
      modalStyle: {},
    };

    this._onOpenEditInformation = this._onOpenEditInformation.bind(this);
    this._onOpenEditPassword = this._onOpenEditPassword.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._renderPopoverContent = this._renderPopoverContent.bind(this);
    this._renderModal = this._renderModal.bind(this);
    this._updateStyle = this._updateStyle.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this._updateStyle);
    this._updateStyle();
  }

  _updateStyle() {
    this.setState({
      modalStyle: {
        height: window.innerHeight < 810 ? window.innerHeight - 100 : 'auto',
        overflowY: window.innerHeight < 810 ? 'scroll' : 'none',
      },
    });
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
    this.setState({ anchorEl: event.target });
  }

  _closeMenu() {
    this.setState({ anchorEl: null });
  }

  static _renderLoading() {
    return <CircularProgress />;
  }

  _renderModal(openState, modalHeadline, component) {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="information-modal-title"
        aria-describedby="information-modal-description"
        open={openState}
        onClose={this._onCloseModal}
      >
        <div style={this.state.modalStyle} className={classes.modal}>
          <Grid container>
            <Grid item xs={12} className={classes.modalHeadline}>
              {modalHeadline}
            </Grid>
            <div className="line" />
            <Grid item xs={12} className={classes.settingTabs}>
              {component}
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }

  _renderEditInformation() {
    return this._renderModal(
      this.state.openEditInformation,
      'Edit your information',
      <Information onCancel={this.onCancelButtonClick} />,
    );
  }

  _renderEditPassword() {
    return this._renderModal(
      this.state.openEditPassword,
      'Edit your password',
      <Password
        onCancel={this.onCancelButtonClick}
        onDone={this._onCloseModal}
      />,
    );
  }

  _renderPopoverContent() {
    return (
      <List>
        <ListItem button onClick={this._onOpenEditInformation}>
          <PersonIcon />
          <ListItemText primary="Information" />
        </ListItem>
        <ListItem button onClick={this._onOpenEditPassword}>
          <KeyIcon />
          <ListItemText primary="Password" />
        </ListItem>
      </List>
    );
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <div>
        <div
          className={classes.menuItem}
          aria-owns={anchorEl ? 'edit-menu' : null}
          aria-haspopup="true"
          onClick={this._openMenu}
        >
          <Tooltip placement={'bottom'} title={'Edit your account'}>
            <span>
              <IconButton>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>

        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this._closeMenu}
        >
          {this._renderPopoverContent()}
        </Popover>
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

export default compose(withStyles(styles))(Settings);
