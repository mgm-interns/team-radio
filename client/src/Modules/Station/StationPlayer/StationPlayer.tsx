import { Card, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { Loading } from 'Components';
import { OnRealTimeStationPlayerChangedSubscription, RealTimeStationPlayerQuery } from 'RadioGraphql';
import * as React from 'react';
import Player from 'react-player';
import { styles } from './styles';

class CoreStationPlayer extends React.Component<CoreStationPlayer.Props> {
  private isSubscribed: boolean;
  private unSubscribe: () => void;

  /**
   * Subscribe to update the station player status
   * Also cancel the subscription when change station
   */
  public componentDidUpdate(prevProps: CoreStationPlayer.Props) {
    if (prevProps.params.stationId !== this.props.params.stationId) {
      this.isSubscribed = false;
      if (this.isSubscribed) {
        this.callUnsubscribe();
      }
    }
    if (this.props.data.StationPlayer && !this.isSubscribed) {
      this.isSubscribed = true;
      const options = OnRealTimeStationPlayerChangedSubscription.getSubscribeToMoreOptions(this.props.params);
      this.unSubscribe = this.props.data.subscribeToMore(options);
    }
  }

  /**
   * Cancel subscription when destroy component
   */
  public componentWillUnmount() {
    if (this.isSubscribed) {
      this.callUnsubscribe();
    }
  }

  public render() {
    const { id, style, className } = this.props;
    return this.renderPlayerWrapper(data => (
      <Player
        id={id}
        style={style}
        className={className}
        url={data.playing && data.playing.song.url}
        height="100%"
        width="100%"
        playing
        muted
      />
    ));
  }

  private renderPlayerWrapper = (children: (data: RealTimeStationPlayerQuery.Player) => React.ReactNode) => {
    const { classes, data } = this.props;
    let content: React.ReactNode;

    if (data.error) {
      // Error
      content = <Typography color={'error'}>Error {data.error.message}</Typography>;
    } else if (data.loading) {
      // Loading
      content = <Loading />;
    } else if (!data.StationPlayer.playing && !data.StationPlayer.playlist.length) {
      // No playing song and no song in playlist
      content = <Typography>No song, add a new one to start listening.</Typography>;
    } else if (!data.StationPlayer.playing && data.StationPlayer.playlist.length) {
      // No playing song, but there is at least 1 song in playlist
      content = <img src={data.StationPlayer.playlist[0].thumbnail} className={classes.thumbnail} />;
    } else {
      // Playing song is active
      content = children(data.StationPlayer);
    }

    return <Card className={classes.container}>{content}</Card>;
  };

  private callUnsubscribe = () => {
    if (typeof this.unSubscribe === 'function') {
      this.unSubscribe();
    }
  };
}

namespace CoreStationPlayer {
  export interface Props
    extends RealTimeStationPlayerQuery.WithHOCProps,
      WithStyles<typeof styles>,
      StationPlayer.Props {}
}

export const StationPlayer = RealTimeStationPlayerQuery.withHOC<StationPlayer.Props>({
  options: (props: StationPlayer.Props) => ({ variables: props.params })
})(withStyles(styles)(CoreStationPlayer));

export namespace StationPlayer {
  export interface Props extends Identifiable, Styleable {
    params: RealTimeStationPlayerQuery.Variables;
  }
}
