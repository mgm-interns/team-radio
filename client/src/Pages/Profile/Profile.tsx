import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

export class CoreProfile extends React.Component<Profile.CoreProps, Profile.States> {
  render(): React.ReactNode {
    return <div>Profile here</div>;
  }
}

export const Profile = withStyles(styles)(CoreProfile);

export namespace Profile {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
