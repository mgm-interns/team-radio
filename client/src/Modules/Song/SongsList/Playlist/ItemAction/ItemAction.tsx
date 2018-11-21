import { Badge, Grid, IconButton, LinearProgress, withStyles, WithStyles } from '@material-ui/core';
import { RealTimeStationPlaylistQueryPlaylistSong } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from '../styles';

class PlaylistItemAction extends React.Component<CoreProps> {
  public render() {
    const { classes, song, currentPlayingSongId } = this.props;
    return (
      <Grid container>
        <div>
          <Grid container>
            <Grid item xs={12}>
              <IconButton className={classes.iconButton}>
                <Badge badgeContent={song.upVotes.length} color={'primary'} classes={{ badge: classes.badge }}>
                  <MdThumbUp />
                </Badge>
              </IconButton>
              <IconButton className={classes.iconButton}>
                <Badge badgeContent={song.downVotes.length} color={'primary'} classes={{ badge: classes.badge }}>
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
  }

  protected calculateVotesRating(upVotes: number, downVotes: number): number {
    if (upVotes === 0 && downVotes === 0) return 50;
    return (upVotes / (upVotes + downVotes)) * 100;
  }
}

interface CoreProps extends Props, WithStyles<typeof styles> {}

export default withStyles(styles)(PlaylistItemAction);

export interface Props {
  song: RealTimeStationPlaylistQueryPlaylistSong;
  currentPlayingSongId?: string;
}
