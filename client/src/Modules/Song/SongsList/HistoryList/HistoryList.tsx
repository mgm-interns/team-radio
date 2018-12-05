import { List, Typography, withStyles, WithStyles } from '@material-ui/core';
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
import { styles } from './styles';

class HistoryList extends React.Component<CoreProps> {
  public render(): React.ReactNode {
    const { id, classes, className, style } = this.props;
    return (
      <div id={id} className={classnames(classes.container, className)} style={style}>
        <RealTimeStationDistinctHistorySongQuery variables={this.parseQueryParams()} fetchPolicy={'cache-and-network'}>
          {({ error, loading, data }) => {
            if (error) return <Typography color={'error'}>Error {error.message}</Typography>;
            if (loading && !data.allDistinctHistorySongs) return <Loading />;
            return (
              <List className={classnames(classes.listContainer, className)} style={style}>
                {data.allDistinctHistorySongs.map(song => (
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
  }

  private parseQueryParams = (): RealTimeStationDistinctHistorySongQueryVariables => {
    if (this.props.params.perPage) {
      return this.props.params;
    }
    return {
      ...this.props.params,
      perPage: 50
    };
  };
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(HistoryList);

export interface Props extends Identifiable, Styleable {
  params: RealTimeStationDistinctHistorySongQueryVariables;
}
