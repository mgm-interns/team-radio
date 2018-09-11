import { CircularProgress, Typography } from '@material-ui/core';
import { Group as UserIcon, Radio as StationIcon } from '@material-ui/icons';
import { authProvider } from 'authProvider';
import { Dashboard } from 'dashboard';
import { buildGraphQLProvider } from 'dataProvider';
import * as React from 'react';
import {
  StationCreate,
  StationEdit,
  StationList,
  StationShow,
  UserCreate,
  UserEdit,
  UserList,
  UserShow
} from 'resources';
import { theme } from 'theme';

const { Admin, Resource } = require('react-admin');

export class App extends React.Component<App.Props, App.States> {
  constructor(props: App.Props) {
    super(props);
    this.state = { dataProvider: null };
  }

  public componentDidMount() {
    buildGraphQLProvider().then((dataProvider: any) => this.setState({ dataProvider }));
  }

  public renderLoading() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress style={{ color: theme.palette.primary.main }} />
        <Typography style={{ marginTop: 12 }} variant="title">
          Loading...
        </Typography>
      </div>
    );
  }

  public render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return this.renderLoading();
    }
    return (
      <Admin theme={theme} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
        <Resource //
          name="users"
          icon={UserIcon}
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="stations"
          icon={StationIcon}
          list={StationList}
          edit={StationEdit}
          create={StationCreate}
          show={StationShow}
        />
      </Admin>
    );
  }
}

export namespace App {
  export interface Props {}

  export interface States {
    dataProvider: any;
  }
}
