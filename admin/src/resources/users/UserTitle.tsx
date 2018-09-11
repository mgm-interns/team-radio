import * as React from 'react';

export const UserTitle = ({ record }: any) => {
  return <span>{record ? `"${record.username}"` : ''}</span>;
};
