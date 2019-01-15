import { List, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, ReactSubscriptionComponent, Styleable } from 'Common';
import { Loading } from 'Components';
import { SongItem } from 'Modules';
import {
  getSubscribeToMoreOptionsForRealTimeStationPlaylistSubscription,
  RealTimeStationPlaylistQueryPlaylist,
  RealTimeStationPlaylistQueryVariables,
  withRealTimeStationPlaylistQuery,
  WithRealTimeStationPlaylistQueryProps
} from 'RadioGraphql';
import * as React from 'react';
import { classnames } from 'Themes';
import { ItemAction } from './ItemAction';
import { styles } from './styles';

class Playlist extends ReactSubscriptionComponent<CoreProps> {
  public render(): React.ReactNode {
    const { classes, className, style } = this.props;
    return this.renderPlayerWrapper(data => (
      <List className={classnames(classes.listContainer, className)} style={style}>
        {data.playlist.map(song => (
          <SongItem.SimpleSong
            key={song.id}
            song={song}
            actions={<ItemAction song={song} currentPlayingSongId={data.currentPlayingSongId} />}
            playing={song.id === data.currentPlayingSongId}
            textClassName={classes.itemText}
          />
        ))}
      </List>
    ));
  }

  protected getSubscribeToMoreOptions = () => {
    return getSubscribeToMoreOptionsForRealTimeStationPlaylistSubscription(this.props.params);
  };

  private renderPlayerWrapper = (children: (data: RealTimeStationPlaylistQueryPlaylist) => React.ReactNode) => {
    const { classes, data, id, className, style } = this.props;
    let content: React.ReactNode;
    if (data.error) {
      // Error
      content = <Typography color={'error'}>Error {data.error.message}</Typography>;
    } else if (data.loading) {
      // Loading
      content = <Loading />;
    } else if (!data.items.playlist.length) {
      // No playing song and no song in playlist
      content = <Typography>No song</Typography>;
    } else {
      // Playing song is active
      return children(data.items);
    }

    return (
      <div id={id} className={classnames(classes.container, className)} style={style}>
        {content}
      </div>
    );
  };
}

interface CoreProps extends WithRealTimeStationPlaylistQueryProps, WithStyles<typeof styles>, Props {}

export default withRealTimeStationPlaylistQuery<Props>({
  options: (props: Props) => ({
    variables: props.params,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })
})(withStyles(styles)(Playlist));

export interface Props extends Identifiable, Styleable {
  params: RealTimeStationPlaylistQueryVariables;
}
