import { Button, createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { History as HistoryIcon, QueueMusic as PlaylistIcon, VideoLibrary as SongIcon } from '@material-ui/icons';
import * as React from 'react';
import { SongMediumDataGrid } from 'resources';
import { StationTitle } from './StationTitle';

const {
  Show,
  TabbedShowLayout,
  DateField,
  TextField,
  ReferenceManyField,
  Tab,
  FunctionField,
  Link
} = require('react-admin');

class BaseStationShow extends React.Component<BaseStationShow.Props> {
  public render() {
    const { classes, ...otherProps } = this.props;
    return (
      <Show title={<StationTitle />} {...otherProps}>
        <TabbedShowLayout>
          <Tab label="Basic">
            <TextField source="id" />
            <DateField source="createdAt" />
            <TextField source="stationName" />
            <TextField source="stationId" label="Station slug" />
          </Tab>
          <Tab label="Playlist">
            <FunctionField
              addLabel={false}
              render={(record: any) => (
                <>
                  <Link to={`/songs?filter=${escape(JSON.stringify({ stationId: record.id }))}`}>
                    <Button color="primary" className={classes.navigationButton}>
                      <SongIcon className={classes.navigationButtonIcon} />
                      View all
                    </Button>
                  </Link>
                  <Link to={`/playListSongs?filter=${escape(JSON.stringify({ stationId: record.id }))}`}>
                    <Button color="primary" className={classes.navigationButton}>
                      <PlaylistIcon className={classes.navigationButtonIcon} />
                      View playlist
                    </Button>
                  </Link>
                  <Link to={`/historySongs?filter=${escape(JSON.stringify({ stationId: record.id }))}`}>
                    <Button color="primary" className={classes.navigationButton}>
                      <HistoryIcon className={classes.navigationButtonIcon} />
                      View history
                    </Button>
                  </Link>
                </>
              )}
            />
            <ReferenceManyField label="" reference="songs" target="station">
              <SongMediumDataGrid />
            </ReferenceManyField>
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  }
}

const styles = ({ spacing }: Theme) =>
  createStyles({
    navigationButton: {
      float: 'right',
      marginTop: spacing.unit
    },
    navigationButtonIcon: {
      marginRight: spacing.unit
    }
  });

export namespace BaseStationShow {
  export interface Props extends WithStyles<typeof styles> {}
}

export const StationShow = withStyles(styles)(BaseStationShow);

export namespace StationShow {
  export interface Props {}
}
