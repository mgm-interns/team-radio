import { Identifiable, Styleable } from 'Common';
import { AllRealTimeStations } from 'RadioGraphql';
import { SimpleStation as SimpleStationItem } from './SimpleStation';
import { VerticalStation as VerticalStationItem } from './VerticalStation';

export namespace StationItem {
  export const SimpleStation = SimpleStationItem;
  export const VerticalStation = VerticalStationItem;

  export interface Props extends Identifiable, Styleable {
    station: AllRealTimeStations.Station;
    onClick?(): void;
  }
}
