import { Identifiable, Styleable } from '@Common';
import { Loading } from '@Components';
import { useSubscription } from '@Hooks';
import { List, Typography } from '@material-ui/core';
import { SongItem } from '@Modules';
import { useAuthenticated } from '@Modules/Authentication/Authenticated';
import { StationPageParams } from '@Pages/StationPage/StationPage';
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

  const subscribeToMoreOptions = React.useMemo(
    () => RealTimeStationPlaylistSubscription.getSubscribeToMoreOptions(props.params),
    [props.params]
  );

  useSubscription(props.data, subscribeToMoreOptions);

  const renderPlayerWrapper = React.useCallback(
    (children: (data: RealTimeStationPlaylistQuery.Playlist) => React.ReactElement<{}>) => {
      let content: React.ReactElement<{}> | null = null;
      const { data } = props;
      if (data.error) {
        // Error
        content = <Typography color={'error'}>Error {data.error.message}</Typography>;
      } else if (data.loading) {
        // Loading
        content = <Loading />;
      } else if (data && data.items && !data.items.playlist.length) {
        // No playing song and no song in playlist
        content = <Typography>No song</Typography>;
      } else if (data.items) {
        // Playing song is active
        return children(data.items);
      }

      return (
        <div id={id} className={classnames(classes.container, className)} style={style}>
          {content}
        </div>
      );
    },
    [classes, props.data]
  );

  return renderPlayerWrapper(data => (
    <List className={classnames(classes.listContainer, className)} style={style}>
      <FlipMove typeName={null}>
        {data.playlist.map(song => (
          <div key={song.id}>
            <SongItem.SimpleSong
              song={song}
              actions={<ItemAction song={song} currentPlayingSongId={data.currentPlayingSongId} />}
              playing={song.id === data.currentPlayingSongId}
              textClassName={authenticated ? classes.itemText : ''}
            />
          </div>
        ))}
      </FlipMove>
    </List>
  ));
};

interface CoreProps extends RealTimeStationPlaylistQuery.WithHOCProps, Props {}

export default RealTimeStationPlaylistQuery.withHOC<Props>({
  options: (props: any) => ({
    variables: { stationId: props.params.stationId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only'
  })
})(Playlist as any);

export interface Props extends Identifiable, Styleable {
  params: StationPageParams;
}
