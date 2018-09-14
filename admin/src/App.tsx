import { CircularProgress, Typography } from '@material-ui/core';
import {
  Group as UserIcon,
  History as HistoryIcon,
  QueueMusic as PlaylistIcon,
  Radio as StationIcon,
  VideoLibrary as SongIcon
} from '@material-ui/icons';
import { authProvider } from 'authProvider';
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
      <Admin theme={theme} menu={Menu} dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
        <Resource
          //
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
        <Resource
          //
          name="songs"
          icon={SongIcon}
          list={SongList}
          edit={SongEdit}
          show={SongShow}
        />
        <Resource
          //
          name="playlistSongs"
          icon={PlaylistIcon}
          list={SongList}
          edit={SongEdit}
          show={SongShow}
        />
        <Resource
          //
          name="historySongs"
          icon={HistoryIcon}
          list={SongList}
          edit={SongEdit}
          show={SongShow}
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
