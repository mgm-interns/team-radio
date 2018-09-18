import { Avatar } from '@material-ui/core';
import { Group as UserIcon } from '@material-ui/icons';
import { Authorization } from 'authProvider';
import * as React from 'react';

const {
  Datagrid,
  EditButton,
  EmailField,
  Filter,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  TextField,
  TextInput,
  FunctionField
} = require('react-admin');

export const UserFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const UserList = (props: any) => (
  <List {...props} filters={<UserFilter />}>
    <Responsive
      small={
        <SimpleList
          leftAvatar={(record: any) => (record.avatarUrl ? <img src={record.avatarUrl} /> : <UserIcon />)}
          primaryText={(record: any) => `${record.firstname} ${record.lastname}`}
          secondaryText={(record: any) => `${record.username || record.email}`}
        />
      }
      medium={<UserMediumDatagrid />}
    />
  </List>
);

export const UserMediumDatagrid = (props: any) => (
  <Datagrid {...props}>
    <FunctionField
      label="Avatar"
      render={(record: any) => (
        <Avatar style={{ width: 40, height: 40, margin: 8 }}>
          <img src={record.avatarUrl} style={{ width: '100%', height: '100%', display: 'block' }} />
        </Avatar>
      )}
    />
    <TextField source="username" />
    <EmailField source="email" />
    <TextField source="firstname" />
    <TextField source="lastname" />
    <TextField source="reputation" />
    {Authorization.isAdmin(props.permissions) && <EditButton />}
    <ShowButton />
  </Datagrid>
);
