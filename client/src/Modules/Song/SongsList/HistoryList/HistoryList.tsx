import { Identifiable, Styleable } from '@Common';
import { Loading } from '@Components';
import { Button, List, Typography } from '@material-ui/core';
import { SongItem } from '@Modules';
import { useAuthenticated } from '@Modules/Authentication/Authenticated';
import { StationPageParams } from '@Pages/StationPage/StationPage';
import { RealTimeStationDistinctHistorySongQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import { ItemAction } from './ItemAction';
import { useStyles } from './styles';

const HistoryList: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [perPage, setPerPage] = React.useState<number>(props.perPage || 20);
  const params = React.useMemo<RealTimeStationDistinctHistorySongQuery.Variables>(() => {
    const { stationId } = props.params;
    return { stationId, perPage, page: 0 };
  }, [props.params.stationId, perPage]);

  const { id, className, style } = props;

  const { error, loading, data } = RealTimeStationDistinctHistorySongQuery.useQuery({
    suspend: false,
    variables: params
  });

  const authenticated = useAuthenticated();

  const content = React.useMemo(() => {
    if (error) return <Typography color={'error'}>Error {error.message}</Typography>;
    if (!data || (loading && data && !data.items)) return <Loading />;
    return (
      <List className={classnames(classes.listContainer, className)} style={style}>
        {data.items.map(song => (
          <SongItem.SimpleSong
            key={song.url}
            song={song}
            actions={<ItemAction song={song} />}
            textClassName={authenticated ? classes.itemText : ''}
          />
        ))}
        <li className={classes.loadMoreContainer}>
          <Button onClick={() => setPerPage(perPage * 2)}>Load more</Button>
        </li>
      </List>
    );
  }, [data, loading, error, classes, className, style, authenticated]);

  return (
    <div id={id} className={classnames(classes.container, className)} style={style}>
      {content}
    </div>
  );
};

interface CoreProps extends Props {}

export default HistoryList;

export interface Props extends Identifiable, Styleable {
  params: StationPageParams;
  perPage?: number;
}
