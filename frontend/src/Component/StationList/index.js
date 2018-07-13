import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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

  _renderLoading(message = '') {
    const { classes, scrollbarRef } = this.props;

    return (
      <div className={classNames([classes.container])} ref={scrollbarRef}>
        <div className={classNames([classes.loadingContainer])}>
          {Array.from({ length: 20 }).map((item, index) => (
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
      </div>
    );
  }

  _renderEmptyComponent() {
    const { emptyMessage } = this.props;

    return this._renderLoading(emptyMessage);
  }

  _renderList() {
    const {
      classes,
      stations,
      onItemClick,
      scrollbarRef,
      disableOnlineCount,
    } = this.props;
    const list = stations.filter((item, index) => index < 20);
    return (
      <div className={classes.container} ref={scrollbarRef}>
        {list.map((station, index) => (
          <StationItem
            key={index}
            {...station}
            enableWavingIcon={!!station.playing}
            disableOnlineCount={disableOnlineCount}
            onClick={onItemClick}
          />
        ))}
      </div>
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
