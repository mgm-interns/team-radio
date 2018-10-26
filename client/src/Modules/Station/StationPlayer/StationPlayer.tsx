import { Typography } from '@material-ui/core';
import * as React from 'react';
import Player from 'react-player';

export class StationPlayer extends React.Component {
  public render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'sandybrown',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Player url="https://www.youtube.com/watch?v=cmSbXsFE3l8" height="100%" width="100%" playing muted />
      </div>
    );
  }
}
