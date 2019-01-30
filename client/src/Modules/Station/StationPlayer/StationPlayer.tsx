import { Identifiable, Styleable } from '@Common';
import { Loading, Player } from '@Components';
import { useSubscription } from '@Hooks';
import { Card, Typography } from '@material-ui/core';
import { StationPageParams } from '@Pages/StationPage/StationPage';
import {
  RealTimeStationPlayerQuery,
  RealTimeStationPlayerSubscription,
  RealTimeStationQuery,
  ReportUnavailableSongMutation
} from '@RadioGraphql';
import * as React from 'react';
import { StationControllerContext } from '../StationContext';
import { useStyles } from './styles';

const StationPlayer: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const parseCurrentlyPlayedAt = React.useCallback((data: RealTimeStationPlayerQuery.Player) => {
    if (!data.startedAt) return 0;
    return (Date.now() - new Date(data.startedAt).getTime()) / 1000;
  }, []);

  const params = React.useMemo<RealTimeStationQuery.Variables>(() => ({ stationId: props.params.stationId }), [
    props.params.stationId
  ]);

  const subscribeToMoreOptions = React.useMemo(
    () => RealTimeStationPlayerSubscription.getSubscribeToMoreOptions(props.params),
    [params]
  );

  useSubscription(props.data, subscribeToMoreOptions);

  const stationControllerContext = React.useContext(StationControllerContext);

  const renderPlayerWrapper = React.useCallback(
    (children: (data?: RealTimeStationPlayerQuery.Player) => React.ReactNode) => {
      const { data } = props;
      let content: React.ReactNode;

      if (data.error) {
        console.error(data.error);
        // Error
        content = <Typography color={'error'}>Error {data.error.message}</Typography>;
      } else if (data.loading) {
        // Loading
        content = <Loading />;
      } else if (!data.player || (!data.player.playing && !data.player.playlistCount)) {
        // No playing song and no song in playlist
        content = <Typography>No song, add a new one to start listening.</Typography>;
      } else if (data.player.nextSongThumbnail) {
        // Display next song thumbnail if there is one in response
        content = <img src={data.player.nextSongThumbnail} className={classes.thumbnail} />;
      }
      return (
        <Card className={classes.container}>
          {children(data.player)}
          {content && <div className={classes.overlayContainer}>{content}</div>}
        </Card>
      );
    },
    [props.data]
  );

  const reportUnavailableSong = ReportUnavailableSongMutation.useMutation();

  const { id, style, className } = props;
  return renderPlayerWrapper(data => (
    <Player
      id={id}
      style={style}
      className={className}
      url={data && data.playing && data.playing.url}
      height="100%"
      width="100%"
      currentlyPlayedAt={data && parseCurrentlyPlayedAt(data)}
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

interface CoreProps extends RealTimeStationPlayerQuery.WithHOCProps, Props {}

export default RealTimeStationPlayerQuery.withHOC<Props>({
  options: (props: any) => ({
    variables: { stationId: props.params.stationId },
    fetchPolicy: 'network-only'
  })
})(StationPlayer as any);

export interface Props extends Identifiable, Styleable {
  params: StationPageParams;
}
