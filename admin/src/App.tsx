// React hot loader must be imported first
import { hot } from 'react-hot-loader';
// tslint:disable-next-line
import { CircularProgress, Typography } from '@material-ui/core';
import {
  Group as UserIcon,
  History as HistoryIcon,
  QueueMusic as PlaylistIcon,
  Radio as StationIcon,
  VideoLibrary as SongIcon
} from '@material-ui/icons';
import { Authorization, authProvider } from 'authProvider';
import { Dashboard } from 'dashboard';
import { buildGraphQLProvider } from 'dataProvider';
import { Menu } from 'layout';
import * as React from 'react';
import {
  SongEdit,
  SongList,
  SongShow,
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

const { Admin, Resource, NotFound } = require('react-admin');

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
      <Admin theme={theme} menu={Menu} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
        {(permissions: Authorization.Permissions) => [
          <Resource
            //
            key="users"
            name="users"
            icon={UserIcon}
            list={Authorization.isAdmin(permissions) ? UserList : NotFound}
            edit={Authorization.isAdmin(permissions) ? UserEdit : NotFound}
            create={Authorization.isAdmin(permissions) ? UserCreate : NotFound}
            show={UserShow}
          />,
          <Resource
            key="stations"
            name="stations"
            icon={StationIcon}
            list={StationList}
            edit={StationEdit}
            create={StationCreate}
            show={StationShow}
          />,
          <Resource
            //
            key="songs"
            name="songs"
            icon={SongIcon}
            list={(props: any) => <SongList title="Songs" {...props} />}
            edit={Authorization.isAdmin(permissions) ? SongEdit : NotFound}
            show={SongShow}
          />,
          <Resource
            //
            key="playlistSongs"
            name="playlistSongs"
            icon={PlaylistIcon}
            list={(props: any) => <SongList title="Playlist" {...props} />}
            edit={Authorization.isAdmin(permissions) ? SongEdit : NotFound}
            show={SongShow}
          />,
          <Resource
            //
            key="historySongs"
            name="historySongs"
            icon={HistoryIcon}
            list={(props: any) => <SongList title="History" {...props} />}
            edit={Authorization.isAdmin(permissions) ? SongEdit : NotFound}
            show={SongShow}
          />
        ]}
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

export default hot(module)(App);
