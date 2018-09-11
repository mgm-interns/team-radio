import * as React from 'react';

export const StationTitle = ({ record }: any) => {
  return <span>{record ? `"${record.stationName}"` : ''}</span>;
};
