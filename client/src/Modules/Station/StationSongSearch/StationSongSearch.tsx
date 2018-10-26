import { Typography } from '@material-ui/core';
import * as React from 'react';

export class StationSongSearch extends React.Component {
  public render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'palegreen',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography>Search box</Typography>
      </div>
    );
  }
}
