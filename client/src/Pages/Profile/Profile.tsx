import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class CoreProfile extends React.Component<CoreProfile.Props> {
  public render(): React.ReactNode {
    return <div>Profile here</div>;
  }
}

namespace CoreProfile {
  export interface Props extends Profile.Props, WithStyles<typeof styles> {}
}

export const Profile: React.ComponentType<Profile.Props> = withStyles(styles)(CoreProfile);

export namespace Profile {
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
