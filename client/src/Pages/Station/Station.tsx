import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

export class CoreStation extends React.Component<Station.CoreProps, Station.States> {
  render(): React.ReactNode {
    return <div>Station here</div>;
  }
}

export const Station = withStyles(styles)(CoreStation);

export namespace Station {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
