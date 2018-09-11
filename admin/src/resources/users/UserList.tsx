import { Group as UserIcon } from '@material-ui/icons';
import * as React from 'react';

const {
  ImageField,
  Datagrid,
  EditButton,
  EmailField,
  Filter,
  List,
  Responsive,
  ShowButton,
  SimpleList,
  TextField,
  TextInput
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
      medium={
        <Datagrid>
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="firstname" />
          <TextField source="lastname" />
          <TextField source="reputation" />
          <ImageField source="avatarUrl" title="username" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);
