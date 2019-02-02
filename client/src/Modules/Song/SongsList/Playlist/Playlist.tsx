import { Identifiable, Styleable } from '@Common';
import { Loading } from '@Components';
import { List, Typography } from '@material-ui/core';
import { SongItem } from '@Modules';
import { useAuthenticated } from '@Modules/Authentication/Authenticated';
import { StationPageParams } from '@Pages';
import { RealTimeStationPlaylistQuery, RealTimeStationPlaylistSubscription } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import FlipMove from 'react-flip-move';
import { ItemAction } from './ItemAction';
import { useStyles } from './styles';

const Playlist: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const { id, className, style } = props;

  const authenticated = useAuthenticated();

  const params = React.useMemo<RealTimeStationPlaylistQuery.Variables>(() => ({ stationId: props.params.stationId }), [
    props.params.stationId
  ]);

  const { data, error, loading } = RealTimeStationPlaylistSubscription.useQueryWithSubscription({
    variables: params,
    fetchPolicy: 'network-only',
    suspend: false
  });

  const renderPlaylistWrapper = React.useCallback(
    (children: (data: RealTimeStationPlaylistQuery.Playlist) => React.ReactElement<{}>) => {
      let content: React.ReactElement<{}> | null = null;
      if (error) {
        // Error
        content = <Typography color={'error'}>Error {error.message}</Typography>;
      } else if (loading) {
        // Loading
        content = <Loading />;
      } else if (data && data && !data.items.playlist.length) {
        // No playing song and no song in playlist
        content = <Typography>No song</Typography>;
      } else if (data) {
        // Playing song is active
        return children(data.items);
      }

      return (
        <div id={id} className={classnames(classes.container, className)} style={style}>
          {content}
        </div>
      );
    },
    [classes, data, error, loading]
  );

  return renderPlaylistWrapper(({ playlist, currentPlayingSongId }) => (
    <List className={classnames(classes.listContainer, className)} style={style}>
      <FlipMove typeName={null}>
        {playlist.map(song => (
          <div key={song.id}>
            <SongItem.SimpleSong
              song={song}
              actions={<ItemAction song={song} currentPlayingSongId={currentPlayingSongId} />}
              playing={song.id === currentPlayingSongId}
              textClassName={authenticated ? classes.itemText : ''}
            />
          </div>
        ))}
      </FlipMove>
    </List>
  ));
};

interface CoreProps extends Props {}

export default Playlist;

export interface Props extends Identifiable, Styleable {
  params: StationPageParams;
}
