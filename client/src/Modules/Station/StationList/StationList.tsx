import { AllRealTimeStations } from 'RadioGraphql';
import * as React from 'react';

class CoreStationList extends React.Component<CoreStationList.Props> {
  public componentDidMount() {
    if (this.props.subscribeToStationsChanged) {
      this.props.subscribeToStationsChanged();
    }
  }

  public render() {
    const { error, loading, data, stationComponent: StationComponent, onItemClick } = this.props;

    if (loading) return 'Loading...';
    if (error) return `Error: ${error.message}`;

    return data.allRealTimeStations.map((station: AllRealTimeStations.Station) => (
      <StationComponent key={station.stationId} station={station} onClick={onItemClick} />
    ));
  }
}

export namespace CoreStationList {
  export interface Props extends StationList.Props {}
}

export const StationList = CoreStationList;

export namespace StationList {
  export interface Props extends AllRealTimeStations.QueryResult {
    stationComponent: React.ComponentType<{
      station: AllRealTimeStations.Station;
      onClick?(): void;
    }>;
    onItemClick?(): void;
    subscribeToStationsChanged?(): void;
  }
}
