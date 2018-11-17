import { Card, Typography } from '@material-ui/core';
import * as React from 'react';

export class StationChatBox extends React.Component {
  public render() {
    return (
      <Card
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography>Chat box</Typography>
      </Card>
    );
  }
}
