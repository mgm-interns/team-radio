import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import VirtualList from 'react-virtual-list';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import styles from './styles';

class History extends Component {
  _getHistoryList({ virtual, itemHeight }) {
    return (
      <ul style={{ paddingTop: 0, paddingBottom: 0 }}>
        {virtual.items.map((video, index) => (
          <li key={index}>
            <Item
              key={video.song_id || index}
              {...video}
              style={{ height: itemHeight }}
            />
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { className, style, data } = this.props;
    const options = {
      initialState: {
        firstItemIndex: 0, // show first 8 items
        lastItemIndex: 7, // during initial render
      },
    };
    const VirtualHistoryList = VirtualList(options)(this._getHistoryList);

    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowY: 'auto', overflowX: 'hidden' }}
      >
        <VirtualHistoryList items={data} itemHeight={80} />
      </Grid>
    );
  }
}

History.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.object,
  style: PropTypes.any,
  data: PropTypes.array,
};

export default compose(withStyles(styles))(History);
