import { withStyles, WithStyles } from '@material-ui/core';
import { FullLayout } from 'Containers';
import * as React from 'react';
import { styles } from './styles';

class CoreProfile extends React.Component<CoreProfile.Props> {
  public render(): React.ReactNode {
    return (
      <FullLayout>
        <div>Profile here</div>
      </FullLayout>
    );
  }
}

namespace CoreProfile {
  export interface Props extends Profile.Props, WithStyles<typeof styles> {}
  export interface States {}
}

export const Profile: React.ComponentType<Profile.Props> = withStyles(styles)(CoreProfile);

export namespace Profile {
  export interface Props {}
}
