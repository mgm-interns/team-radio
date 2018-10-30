import { withStyles, WithStyles } from '@material-ui/core';
import { FullLayout } from 'Containers';
import * as React from 'react';
import { styles } from './styles';

class ProfilePage extends React.Component<CoreProps> {
  public render(): React.ReactNode {
    return (
      <FullLayout>
        <div>Profile here</div>
      </FullLayout>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(ProfilePage);

export interface Props {}
