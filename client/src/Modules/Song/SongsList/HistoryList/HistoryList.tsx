import { List, Typography } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { Loading } from 'Components';
import { SongItem } from 'Modules';
import {
  RealTimeStationDistinctHistorySongQuery,
  RealTimeStationDistinctHistorySongQueryVariables
} from 'RadioGraphql';
import * as React from 'react';
import { classnames } from 'Themes';
import { ItemAction } from './ItemAction';
import { useStyles } from './styles';

const HistoryList: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id, className, style } = props;

  const params = React.useMemo(
    (): RealTimeStationDistinctHistorySongQueryVariables => {
      if (props.params.perPage) {
        return props.params;
      }
      return { ...props.params, perPage: 50 };
    },
    [props.params]
  );

  return (
    <div id={id} className={classnames(classes.container, className)} style={style}>
      <RealTimeStationDistinctHistorySongQuery
        key={params.stationId}
        variables={params}
        fetchPolicy={'cache-and-network'}
      >
        {({ error, loading, data }) => {
          if (error) return <Typography color={'error'}>Error {error.message}</Typography>;
          if (loading && !data.items) return <Loading />;
          return (
            <List className={classnames(classes.listContainer, className)} style={style}>
              {data.items.map(song => (
                <SongItem.SimpleSong
                  key={song.url}
                  song={song}
                  actions={<ItemAction song={song} />}
                  textClassName={classes.itemText}
                />
              ))}
            </List>
          );
        }}
      </RealTimeStationDistinctHistorySongQuery>
    </div>
  );
};

interface CoreProps extends Props {}

export default HistoryList;

export interface Props extends Identifiable, Styleable {
  params: RealTimeStationDistinctHistorySongQueryVariables;
}
