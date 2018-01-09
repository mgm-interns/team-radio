import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import styles from './styles';

class History extends Component {
  render() {
    const { className, style, history } = this.props;
    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto' }}
      >
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          {history.map((video, index) => (
            <Item key={index} {...video} playing={index === 0} />
          ))}
        </List>
      </Grid>
    );
  }
}

History.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
  history: PropTypes.array,
};

export default compose(withStyles(styles))(History);
