import { Grid, IconButton, withStyles, WithStyles } from '@material-ui/core';
import { AddSongMutation, RealTimeStationDistinctHistorySong } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite, MdReplay } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from './styles';

class PlaylistItemAction extends React.Component<CoreProps> {
  public render() {
    const { classes, song } = this.props;
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
  }
}

interface CoreProps extends Props, WithStyles<typeof styles> {}

export default withStyles(styles)(PlaylistItemAction);

export interface Props {
  song: RealTimeStationDistinctHistorySong;
}
