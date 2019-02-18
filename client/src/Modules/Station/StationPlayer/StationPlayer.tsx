import { Identifiable, Styleable } from '@Common';
import { EmptyContainer, Loading, Player } from '@Components';
import { Card, Typography } from '@material-ui/core';
import { StationPageParams } from '@Pages';
import {
  RealTimeStationPlayerQuery,
  RealTimeStationPlayerSubscription,
  ReportUnavailableSongMutation
} from '@RadioGraphql';
import * as React from 'react';
import { StationControllerContext } from '../StationContext';
import { useStyles } from './styles';

const StationPlayer: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const parseCurrentlyPlayedAt = React.useCallback((player: RealTimeStationPlayerQuery.Player) => {
    if (!player.startedAt) return 0;
    return (Date.now() - new Date(player.startedAt).getTime()) / 1000;
  }, []);

  const params = React.useMemo<RealTimeStationPlayerQuery.Variables>(() => ({ stationId: props.params.stationId }), [
    props.params.stationId
  ]);

  const { data, loading, error } = RealTimeStationPlayerSubscription.useQueryWithSubscription({
    variables: params,
    fetchPolicy: 'network-only',
    suspend: false
  });

  const stationControllerContext = React.useContext(StationControllerContext);

  const renderPlayerWrapper = React.useCallback(
    (children: (data?: RealTimeStationPlayerQuery.Player) => React.ReactNode) => {
      let content: React.ReactNode;

      if (error) {
        console.error(error);
        // Error
        content = <Typography color={'error'}>Error {error.message}</Typography>;
      } else if (loading) {
        // Loading
        content = <Loading />;
      } else if (data && (!data.player || (!data.player.playing && !data.player.playlistCount))) {
        // No playing song and no song in playlist
        content = <EmptyContainer noImg label={'Add a song to start the player'} />;
      } else if (data && data.player.nextSongThumbnail) {
        // Display next song thumbnail if there is one in response
        content = <img src={data.player.nextSongThumbnail} className={classes.thumbnail} />;
      }
      return (
        <Card className={classes.container}>
          {children(data && data.player)}
          {content && <div className={classes.overlayContainer}>{content}</div>}
        </Card>
      );
    },
    [data, loading, error, classes]
  );

  const reportUnavailableSong = ReportUnavailableSongMutation.useMutation();

  const { id, style, className } = props;
  return renderPlayerWrapper(player => (
    <Player
      key={params.stationId}
      id={id}
      style={style}
      className={className}
      url={player && player.playing && player.playing.url}
      height="100%"
      width="100%"
      currentlyPlayedAt={player && parseCurrentlyPlayedAt(player)}
      muted={stationControllerContext.muted}
      onError={(errorCode: number, url: string) => {
        console.error(`Error while playing video`, errorCode, url);
        reportUnavailableSong({
          variables: { errorCode, url, stationId: props.params.stationId }
        });
      }}
    />
  ));
};

interface CoreProps extends Props {}

export default StationPlayer;

export interface Props extends Identifiable, Styleable {
  params: StationPageParams;
}
