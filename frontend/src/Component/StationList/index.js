import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { StationItem } from 'Component';
import Typography from 'material-ui/Typography';
import Scrollbar from 'react-scrollbar';
import classNames from 'classnames';
import styles from './styles';

class StationList extends Component {
  constructor(props) {
    super(props);

    this._renderList = this._renderList.bind(this);
    this._renderLoading = this._renderLoading.bind(this);
    this._renderEmptyComponent = this._renderEmptyComponent.bind(this);
  }

  _renderLoading(message = '') {
    const { classes, scrollbarInstanceLevel, scrollbarRef } = this.props;

    return (
      <Scrollbar
        level={scrollbarInstanceLevel}
        className={classNames([classes.container])}
        contentClassName={classes.content}
        swapWheelAxes={true}
        smoothScrolling
        stopScrollPropagation
        ref={scrollbarRef}
      >
        <div className={classNames([classes.loadingContainer])}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className={classes.stationWrapper}>
              <div
                className={classNames([
                  classes.stationAvatar,
                  classes.loadingAvatar,
                ])}
              />
              <div
                className={classNames([
                  classes.stationInfo,
                  classes.loadingInfo,
                ])}
              />
            </div>
          ))}

          <div
            className={classNames([
              classes.container,
              classes.messageContainer,
            ])}
          >
            <Typography type={'subheading'}>{message}</Typography>
          </div>
        </div>
      </Scrollbar>
    );
  }

  _renderEmptyComponent() {
    const { classes, emptyMessage } = this.props;

    return this._renderLoading(emptyMessage);
  }

  _renderList() {
    const {
      classes,
      stations,
      onItemClick,
      scrollbarRef,
      disableOnlineCount,
      scrollbarInstanceLevel,
    } = this.props;
    return (
      <Scrollbar
        speed={1.6}
        level={scrollbarInstanceLevel}
        className={classes.container}
        contentClassName={classes.content}
        swapWheelAxes={true}
        smoothScrolling
        stopScrollPropagation
        ref={scrollbarRef}
      >
        {stations.map((station, index) => (
          <StationItem
            key={index}
            {...station}
            enableWavingIcon={!!station.playing}
            disableOnlineCount={disableOnlineCount}
            onClick={onItemClick}
          />
        ))}
      </Scrollbar>
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
  disableOnlineCount: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onItemClick: PropTypes.func,
  scrollbarRef: PropTypes.func,
  scrollbarInstanceLevel: PropTypes.string,
};

StationList.defaultProps = {
  stations: [],
  loading: false,
  scrollbarInstanceLevel: 'StationsSwitcher',
  emptyMessage: 'No stations.',
  onItemClick: () => {},
};

export default withStyles(styles)(StationList);
