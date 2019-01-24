import { Grid, IconButton } from '@material-ui/core';
import { AddSongMutation, RealTimeStationDistinctHistorySongQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import { MdFavorite, MdReplay } from 'react-icons/md';
import { useStyles } from './styles';

export const PlaylistItemAction: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { song } = props;
  return (
    <Grid container>
      <AddSongMutation.default>
        {addSong => (
          <IconButton
            className={classnames(classes.iconButton)}
            onClick={() => addSong({ variables: { url: song.url } })}
          >
            <MdReplay />
          </IconButton>
        )}
      </AddSongMutation.default>
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
