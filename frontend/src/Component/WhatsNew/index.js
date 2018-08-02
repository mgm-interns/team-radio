import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import ListSubheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';
import GithubIcon from 'react-icons/lib/go/mark-github';
import NewTabIcon from 'react-icons/lib/md/open-in-new';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { getRecentRepositoryCommits } from 'Redux/api/commits';
import { reduceByWords } from 'Transformer/transformText';
import styles from './styles';

class WhatsNew extends Component {
  static _resolveMessage(message) {
    const maximumWords = 15;
    return reduceByWords(message, maximumWords)
      .split('\n')
      .map(
        (text, key) =>
          text.trim() && (
            <span key={key}>
              {text}
              <br />
            </span>
          ),
      );
  }

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this._renderPopoverContent = this._renderPopoverContent.bind(this);
    this._renderCommitItem = this._renderCommitItem.bind(this);
  }

  _openMenu = event => {
    this.props.fetchCommits();
    this.setState({ anchorEl: event.target });
  };

  _closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  _renderPopoverContent() {
    const { classes, response } = this.props;
    const commits = (response && response.data) || [];
    return (
      <List
        className={classes.listContainer}
        subheader={
          <ListSubheader disableSticky>
            Latest release notes on
            <a
              href={process.env.REACT_APP_GITHUB_REPOSITORY}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <GithubIcon />
              </IconButton>
            </a>
          </ListSubheader>
        }
      >
        <Divider />
        {commits.map(this._renderCommitItem)}
      </List>
    );
  }

  _renderCommitItem(item) {
    const { classes } = this.props;

    let avatarUrl = null;
    let githubProfileLink = null;

    if (item.committer) {
      avatarUrl = item.committer.avatar_url;
      githubProfileLink = item.committer.html_url;
    }
    if (item.author) {
      avatarUrl = item.author.avatar_url;
      githubProfileLink = item.author.html_url;
    }

    let date = null;
    if (item.commit.committer) {
      date = moment(item.commit.committer.date).format('DD/MM/YYYY');
    }
    if (item.commit.author) {
      date = moment(item.commit.committer.date).format('DD/MM/YYYY');
    }

    return [
      <ListItem key={item.sha}>
        <Avatar>
          <a
            href={githubProfileLink}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.linkIcon}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className={classes.avatar} />
            ) : (
              <GithubIcon />
            )}
          </a>
        </Avatar>
        <ListItemText
          primary={WhatsNew._resolveMessage(item.commit.message)}
          secondary={
            <span>
              {date}{' '}
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.linkIcon}
              >
                <Icon>
                  <NewTabIcon />
                </Icon>
              </a>
            </span>
          }
        />
      </ListItem>,
      <Divider key={`${item.sha}-divider`} />,
    ];
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, loading } = this.props;
    return (
      <div>
        <div
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this._openMenu}
          className={classes.container}
        >
          <Typography type="body1" component="span">
            {"What's New!"}
          </Typography>
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
          open={Boolean(anchorEl) && !loading}
          onClose={this._closeMenu}
        >
          {this._renderPopoverContent()}
        </Popover>
      </div>
    );
  }
}

WhatsNew.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool,
  response: PropTypes.shape({}),
  fetchCommits: PropTypes.func,
};

const mapStateToProps = ({ api: { commits } }) => ({
  loading: commits.loading,
  response: commits.data,
});

const mapDispatchToProps = dispatch => ({
  fetchCommits: () => dispatch(getRecentRepositoryCommits()),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(WhatsNew);
