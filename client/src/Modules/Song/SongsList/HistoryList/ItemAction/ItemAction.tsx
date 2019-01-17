import { Grid, IconButton } from '@material-ui/core';
import { AddSongMutation, RealTimeStationDistinctHistorySong } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite, MdReplay } from 'react-icons/md';
import { classnames } from 'Themes';
import { useStyles } from './styles';

export const PlaylistItemAction: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { song } = props;
  return (
    <Grid container>
      <AddSongMutation>
        {addSong => (
          <IconButton
            className={classnames(classes.iconButton)}
            onClick={() => addSong({ variables: { url: song.url } })}
          >
            <MdReplay />
          </IconButton>
        )}
      </AddSongMutation>
      <IconButton className={classnames(classes.iconButton)}>
        <MdFavorite />
      </IconButton>
    </Grid>
  );
};

interface CoreProps extends Props {}

export default PlaylistItemAction;

export interface Props {
  song: RealTimeStationDistinctHistorySong;
}
