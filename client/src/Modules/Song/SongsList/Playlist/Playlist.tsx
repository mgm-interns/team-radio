import { Badge, Grid, IconButton, LinearProgress, List, Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, ReactSubscriptionComponent, Styleable } from 'Common';
import { Loading } from 'Components';
import { SongItem } from 'Modules';
import {
  getSubscribeToMoreOptionsForRealTimeStationPlaylistSubscription,
  RealTimeStationPlaylistQueryPlaylist,
  RealTimeStationPlaylistQueryPlaylistSong,
  RealTimeStationPlaylistQueryVariables,
  withRealTimeStationPlaylistQuery,
  WithRealTimeStationPlaylistQueryProps
} from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { classnames } from 'Themes';
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
            actions={this.renderActions(song, data.currentPlayingSongId)}
            playing={song.id === data.currentPlayingSongId}
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
    } else if (!data.StationPlaylist.playlist.length) {
      // No playing song and no song in playlist
      content = <Typography>No song</Typography>;
    } else {
      // Playing song is active
      return children(data.StationPlaylist);
    }

    return (
      <div id={id} className={classnames(classes.container, className)} style={style}>
        {content}
      </div>
    );
  };

  private renderActions = (
    song: RealTimeStationPlaylistQueryPlaylistSong,
    currentPlayingSongId?: string
  ): React.ReactNode => {
    const { classes } = this.props;
    return (
      <Grid container>
        <div>
          <Grid container>
            <Grid item xs={12}>
              <IconButton className={classes.iconButton}>
                <Badge badgeContent={song.upVotes.length} color="primary" classes={{ badge: classes.badge }}>
                  <MdThumbUp />
                </Badge>
              </IconButton>
              <IconButton className={classes.iconButton}>
                <Badge badgeContent={song.downVotes.length} color="primary" classes={{ badge: classes.badge }}>
                  <MdThumbDown />
                </Badge>
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress
                className={classes.linearProgress}
                variant={'determinate'}
                value={this.calculateVotesRating(song.upVotes.length, song.downVotes.length)}
              />
            </Grid>
          </Grid>
        </div>
        <IconButton className={classnames(classes.iconButton, classes.favoriteButton)}>
          <MdFavorite />
        </IconButton>
      </Grid>
    );
  };

  private calculateVotesRating = (upVotes: number, downVotes: number): number => {
    if (upVotes === 0 && downVotes === 0) return 50;
    return (upVotes / (upVotes + downVotes)) * 100;
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
