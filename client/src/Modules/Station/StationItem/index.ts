import { Identifiable, Styleable } from 'Common';
import { AllRealTimeStationsQueryStation } from 'RadioGraphql';
import { SimpleStation } from './SimpleStation';
import { VerticalStation } from './VerticalStation';

export const StationItem = {
  SimpleStation,
  VerticalStation
};

export interface StationItemProps extends Identifiable, Styleable {
  station: AllRealTimeStationsQueryStation;
  onClick?(): void;
}
