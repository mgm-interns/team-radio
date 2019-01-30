import { Grid, IconButton } from '@material-ui/core';
import { useAuthenticated } from '@Modules/Authentication/Authenticated';
import { AddSongMutation, RealTimeStationDistinctHistorySongQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import { MdFavorite, MdReplay } from 'react-icons/md';
import { useStyles } from './styles';

export const PlaylistItemAction: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { song } = props;

  const addSong = AddSongMutation.useMutation({ variables: { url: song.url } });

  const authenticated = useAuthenticated();
  if (!authenticated) return null;

  return (
    <Grid container>
      <IconButton className={classnames(classes.iconButton)} onClick={() => addSong()}>
        <MdReplay />
      </IconButton>
      <IconButton className={classnames(classes.iconButton)}>
        <MdFavorite />
      </IconButton>
    </Grid>
  );
};

interface CoreProps extends Props {}

export default PlaylistItemAction;

export interface Props {
  song: RealTimeStationDistinctHistorySongQuery.Song;
}
