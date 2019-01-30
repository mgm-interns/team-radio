import { Badge, Grid, IconButton, LinearProgress } from '@material-ui/core';
import { Authenticated } from '@Modules';
import { useAuthenticated } from '@Modules/Authentication/Authenticated';
import { RealTimeStationPlaylistQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import { MdFavorite, MdThumbDown, MdThumbUp } from 'react-icons/md';
import { useStyles } from './styles';

const PlaylistItemAction: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { song, currentPlayingSongId } = props;

  const voteRating = React.useMemo<number>(() => {
    const upVotes = song.upVotes.length;
    const downVotes = song.downVotes.length;
    if (upVotes === 0 && downVotes === 0) return 50;
    return (upVotes / (upVotes + downVotes)) * 100;
  }, [song.upVotes, song.downVotes]);

  const authenticated = useAuthenticated();
  if (!authenticated) return null;

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
            <LinearProgress className={classes.linearProgress} variant={'determinate'} value={voteRating} />
          </Grid>
        </Grid>
      </div>
      <Authenticated>
        <IconButton className={classnames(classes.iconButton, classes.favoriteButton)}>
          <MdFavorite />
        </IconButton>
      </Authenticated>
    </Grid>
  );
};

interface CoreProps extends Props {}

export default PlaylistItemAction;

export interface Props {
  song: RealTimeStationPlaylistQuery.PlaylistSong;
  currentPlayingSongId?: string;
}
