import { Identifiable, Styleable } from '@Common';
import { Loading } from '@Components';
import { List, Typography } from '@material-ui/core';
import { SongItem } from '@Modules';
import { RealTimeStationDistinctHistorySongQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as React from 'react';
import { ItemAction } from './ItemAction';
import { useStyles } from './styles';

const HistoryList: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id, className, style } = props;

  const params = React.useMemo((): RealTimeStationDistinctHistorySongQuery.Variables => {
    if (props.params.perPage) {
      return props.params;
    }
    return { ...props.params, perPage: 50 };
  }, [props.params]);

  const { error, loading, data } = RealTimeStationDistinctHistorySongQuery.useQuery({
    suspend: false,
    variables: params,
    fetchPolicy: 'cache-and-network'
  });

  const content = React.useMemo(() => {
    if (error) return <Typography color={'error'}>Error {error.message}</Typography>;
    if (loading && data && !data.items) return <Loading />;
    return (
      <List className={classnames(classes.listContainer, className)} style={style}>
        {data &&
          data.items.map(song => (
            <SongItem.SimpleSong
              key={song.url}
              song={song}
              actions={<ItemAction song={song} />}
              textClassName={classes.itemText}
            />
          ))}
      </List>
    );
  }, [data, loading, error, classes, className, style]);

  return (
    <div id={id} className={classnames(classes.container, className)} style={style}>
      {content}
    </div>
  );
};

interface CoreProps extends Props {}

export default HistoryList;

export interface Props extends Identifiable, Styleable {
  params: RealTimeStationDistinctHistorySongQuery.Variables;
}
