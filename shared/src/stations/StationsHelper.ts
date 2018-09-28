export namespace StationsHelper {
  export function sortRealTimeStations<T extends RealTimeStation>(list: T[]): T[] {
    return list.sort((s1, s2) => {
      return s2.onlineCount - s1.onlineCount;
    });
  }

  export interface RealTimeStation {
    id: string;
    onlineCount: number;
  }
}
