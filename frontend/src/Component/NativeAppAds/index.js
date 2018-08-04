import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Images from 'Theme/Images';
import { isElectronInstance } from 'Util/electron';
import styles from './styles';

class NativeAppAds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isOpen: true });
    }, 3000);
  }

  renderMessage() {
    const { classes } = this.props;
    if (isElectronInstance()) return null;
    return (
      <div className={classes.container}>
        <div className={classes.leftSection}>
          <img src={Images.logo} alt="Team Radio" className={classes.img} />
        </div>
        <div className={classes.rightSection}>
          <Typography type="body1">
            Try <strong>Team Radio Native</strong> for better background
            playing, notifications and more...
          </Typography>
          <Typography type="body1">
            Go to{' '}
            <a
              href={`${process.env.REACT_APP_GITHUB_REPOSITORY}/releases`}
              target="_blank"
              rel="noopener noreferrer"
            >
              release page
            </a>
            .
          </Typography>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Snackbar
        open={this.state.isOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={this.renderMessage()}
        action={
          <Button
            className={classes.actionButton}
            onClick={() => this.setState({ isOpen: false })}
          >
            Close
          </Button>
        }
      />
    );
  }
}

NativeAppAds.propTypes = {
  classes: PropTypes.any,
};

export default withStyles(styles)(NativeAppAds);
