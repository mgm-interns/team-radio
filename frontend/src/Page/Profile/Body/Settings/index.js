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
      value: 0,
      open: false,
      secondSource:
        'http://www.followingthenerd.com/site/wp-content/uploads/avatar.jpg_274898881.jpg',
    };

    this.handleChange = this.handleChange.bind(this);
    this._onOpenModal = this._onOpenModal.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
  }

  onCancelButtonClick() {
    this.setState({ open: !this.state.open });
  }

  onSubmitButtonClick(values) {
    console.log(values);
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

  componentWillReceiveProps(nextProps) {
    const { userResponse } = nextProps;

    if (
      (!userResponse.loading &&
        userResponse.data.username !== this.props.userResponse.data.username) ||
      (!userResponse.loading &&
        userResponse.data.is_password !==
          this.props.userResponse.data.is_password)
    ) {
      // if (!userResponse.loading) {
      this.props.history.push(`/profile/${userResponse.data.username}`);
    }
  }

  render() {
    const { classes, user } = this.props;

    if (!user) {
      return this._renderLoading();
    }

    const SecondButton = this._renderSecondItem();
    return [
      <Button onClick={this._onOpenModal} key={1}>
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
            {this.state.value === 0 && (
              <TabContainer>
                <Information onCancel={this.onCancelButtonClick} />
              </TabContainer>
            )}
            {this.state.value === 1 && (
              <TabContainer>
                <Security onCancel={this.onCancelButtonClick} />
              </TabContainer>
            )}
          </Grid>
        </div>
      </Modal>,
    ];
  }
}

Settings.propTypes = {
  classes: PropTypes.any,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  userResponse: state.api.user,
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, null),
)(Settings);
