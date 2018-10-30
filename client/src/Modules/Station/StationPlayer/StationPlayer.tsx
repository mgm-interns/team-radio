import { Card, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, ReactSubscriptionComponent, Styleable } from 'Common';
import { Loading } from 'Components';
import { OnRealTimeStationPlayerChangedSubscription, RealTimeStationPlayerQuery } from 'RadioGraphql';
import * as React from 'react';
import Player from 'react-player';
import { styles } from './styles';

class CoreStationPlayer extends ReactSubscriptionComponent<CoreStationPlayer.Props> {
  public render() {
    const { id, style, className } = this.props;
    return this.renderPlayerWrapper(data => (
      <Player
        id={id}
        style={style}
        className={className}
        url={data.playing && data.playing.url}
        height="100%"
        width="100%"
        playing
        muted
      />
    ));
  }

  protected getSubscribeToMoreOptions = () => {
    return OnRealTimeStationPlayerChangedSubscription.getSubscribeToMoreOptions(this.props.params);
  };

  private renderPlayerWrapper = (children: (data: RealTimeStationPlayerQuery.Player) => React.ReactNode) => {
    const { classes, data } = this.props;
    let content: React.ReactNode;

    if (data.error) {
      console.error(data.error);
      // Error
      content = <Typography color={'error'}>Error {data.error.message}</Typography>;
    } else if (data.loading) {
      // Loading
      content = <Loading />;
    } else if (!data.StationPlayer.playing && !data.StationPlayer.playlistCount) {
      // No playing song and no song in playlist
      content = <Typography>No song, add a new one to start listening.</Typography>;
    } else if (data.StationPlayer.nextSongThumbnail) {
      // Display next song thumbnail if there is one in response
      content = <img src={data.StationPlayer.nextSongThumbnail} className={classes.thumbnail} />;
    } else {
      // Playing song is active
      content = children(data.StationPlayer);
    }

    return <Card className={classes.container}>{content}</Card>;
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
