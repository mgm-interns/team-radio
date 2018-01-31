import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import orderBy from 'lodash/orderBy';
import List from 'react-virtualized/dist/commonjs/List';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Item from './Item';
import styles from './styles';

class FavouriteVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listWidth: 0,
      listHeight: 0,
    };

    this._renderRow = this._renderRow.bind(this);
  }

  componentDidMount() {
    this.setState({
      listWidth: this.divElement.clientWidth,
      listHeight: this.divElement.clientHeight,
    });
  }

  _renderRow({ index, style, key }) {
    const { data } = this.props;

    const item = orderBy(data, ['created_date'], ['desc'])[index];

    return (
      <div key={key} style={style}>
        <Item {...item} />
      </div>
    );
  }

  render() {
    const { className, style, data } = this.props;
    const { listWidth, listHeight } = this.state;

    return (
      <Grid
        item
        xs={12}
        className={className}
        style={{ ...style, overflowX: 'hidden' }}
      >
        <div
          style={{ height: '100%' }}
          ref={element => {
            this.divElement = element;
          }}
        >
          <List
            width={listWidth}
            height={listHeight}
            rowCount={data.length}
            rowHeight={80}
            rowRenderer={this._renderRow}
            overscanRowCount={10}
          />
        </div>
      </Grid>
    );
  }
}

FavouriteVideos.propTypes = {
  className: PropTypes.any,
  classes: PropTypes.object,
  style: PropTypes.any,
  data: PropTypes.array,
};

export default compose(withStyles(styles))(FavouriteVideos);
