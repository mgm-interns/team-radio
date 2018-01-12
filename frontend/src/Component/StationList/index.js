import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { StationItem } from 'Component';
import Typography from 'material-ui/Typography';
import classNames from 'classnames';
import styles from './styles';

class StationList extends Component {
  constructor(props) {
    super(props);

    this._renderList = this._renderList.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderEmptyComponent = this._renderEmptyComponent.bind(this);
  }

  _renderLoading() {
    const { classes } = this.props;

    return (
      <div
        className={classNames([classes.container, classes.loadingContainer])}
      >
        {[1, 2, 3].map((item, index) => (
          <div key={index} className={classes.stationWrapper}>
            <div
              className={classNames([
                classes.stationAvatar,
                classes.loadingAvatar,
              ])}
            />
            <div
              className={classNames([classes.stationInfo, classes.loadingInfo])}
            />
          </div>
        ))}
      </div>
    );
  }

  _renderEmptyComponent() {
    const { classes, emptyMessage } = this.props;

    return (
      <div
        className={classNames([
          classes.container,
          classes.loadingContainer,
          classes.emptyContainer,
        ])}
      >
        <Typography type={'display1'}>{emptyMessage}</Typography>
      </div>
    );
  }
  _renderList() {
    const { classes, stations } = this.props;
    return (
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        className={classes.container}
        renderView={() => <div className={classes.scrollArea} />}
        ref={ref => {
          this.scrollBar = ref;
        }}
      >
        {stations.map((station, index) => (
          <StationItem
            key={index}
            {...station}
            disableOnlineCount
            // goToStationPage={() => this._goToStationPage(station)}
          />
        ))}
      </Scrollbars>
    );
  }

  render() {
    const { loading, stations } = this.props;
    if (loading) {
      return this._renderLoading();
    }
    if (stations.length <= 0) {
      return this._renderEmptyComponent();
    }
    return this._renderList();
  }
}

StationList.propTypes = {
  classes: PropTypes.object,
  stations: PropTypes.array,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
};
StationList.defaultProps = {
  stations: [],
  loading: false,
  emptyMessage: 'No stations.',
};

export default withStyles(styles)(StationList);
