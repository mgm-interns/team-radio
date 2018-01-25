import React, { Component } from 'react';
import { NavBar, Footer } from 'Component';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import List, { ListItem } from 'material-ui/List';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';

import Markdown from 'react-markdown';

import styles from './styles';
import scoreSource from './score';

class Help extends Component {
  constructor(props) {
    super(props);

    this.handleControlsChange = this.handleControlsChange.bind(this);
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
    this.state = {
      markdownSrc: scoreSource.content,
    };
  }

  handleMarkdownChange(evt) {
    this.setState({ markdownSrc: evt.target.value });
  }

  handleControlsChange(mode) {
    this.setState({ htmlMode: mode });
  }

  render() {
    const { classes } = this.props;

    return [
      <NavBar key={1} color="primary" />,
      <div key={2} className={classes.wrapper}>
        <Markdown source={this.state.markdownSrc} />
      </div>,
    ];
  }
}

export default compose(withStyles(styles))(Help);
