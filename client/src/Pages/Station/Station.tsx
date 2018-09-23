import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class CoreStation extends React.Component<CoreStation.Props> {
  public render(): React.ReactNode {
    return <div>Station here</div>;
  }
}

namespace CoreStation {
  export interface Props extends Station.Props, WithStyles<typeof styles> {}
}

export const Station: React.ComponentType<Station.Props> = withStyles(styles)(CoreStation);

export namespace Station {
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
