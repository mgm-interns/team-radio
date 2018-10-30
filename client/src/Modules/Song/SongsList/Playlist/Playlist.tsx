import {
  Badge,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  List,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { Identifiable } from 'Common';
import { Loading } from 'Components';
import { SongItem } from 'Modules';
import { RealTimeStationPlayerQuery } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from './styles';

class CorePlaylist extends React.Component<CorePlaylist.Props> {
  public render(): React.ReactNode {
    const { classes } = this.props;
    return this.renderPlayerWrapper(data => (
      <List className={classes.listContainer}>
        {data.map(song => (
          <SongItem.SimpleSong key={song.id} song={song} actions={this.renderActions(song)} />
        ))}
      </List>
    ));
  }

  private renderPlayerWrapper = (children: (data: RealTimeStationPlayerQuery.PlaylistSong[]) => React.ReactNode) => {
    const { classes, data, id } = this.props;
    let content: React.ReactNode;
    if (data.error) {
      // Error
      content = <Typography color={'error'}>Error {data.error.message}</Typography>;
    } else if (data.loading) {
      // Loading
      content = <Loading />;
    } else if (!data.StationPlayer.playlist.length) {
      // No playing song and no song in playlist
      content = <Typography>No song</Typography>;
    } else {
      // Playing song is active
      return children(data.StationPlayer.playlist);
    }

    return (
      <Card id={id} className={classes.container}>
        {content}
      </Card>
    );
  };

  private renderActions = (song: RealTimeStationPlayerQuery.PlaylistSong): React.ReactNode => {
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

namespace CorePlaylist {
  export interface Props extends RealTimeStationPlayerQuery.WithHOCProps, WithStyles<typeof styles>, Playlist.Props {}
}

export const Playlist = RealTimeStationPlayerQuery.withHOC<Playlist.Props>({
  options: (props: Playlist.Props) => ({ variables: props.params })
})(withStyles(styles)(CorePlaylist));

export namespace Playlist {
  export interface Props extends Identifiable {
    params: RealTimeStationPlayerQuery.Variables;
  }
}
