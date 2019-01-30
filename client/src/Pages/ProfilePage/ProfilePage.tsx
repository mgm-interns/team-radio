import { FullLayout } from '@Containers';
import { withAuthenticated } from '@Modules';
import * as React from 'react';
import { useStyles } from './styles';

const ProfilePage: React.FunctionComponent<CoreProps> = () => {
  const classes = useStyles();

  return (
    <FullLayout>
      <div>Profile here</div>
    </FullLayout>
  );
};

interface CoreProps extends Props {}

export default withAuthenticated('/')(ProfilePage);

export interface Props {}
