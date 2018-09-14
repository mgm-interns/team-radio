import * as React from 'react';

export const SongTitle = ({ record }: any) => {
  return <span>{record ? `"${record.title}"` : ''}</span>;
};
