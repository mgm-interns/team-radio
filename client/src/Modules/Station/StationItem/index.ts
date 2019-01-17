import { Identifiable, Styleable } from 'Common';
import { SimpleStation } from './SimpleStation';
import { VerticalStation } from './VerticalStation';

export const StationItem = {
  SimpleStation,
  VerticalStation
};

export interface StationItemProps extends Identifiable, Styleable {
  station: {
    id: string;
    stationId: string;
    stationName: string;
    onlineCount: number;
    thumbnail?: string;
  };
  onClick?(): void;
}
