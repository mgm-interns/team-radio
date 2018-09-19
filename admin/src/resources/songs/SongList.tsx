import { Typography } from '@material-ui/core';
import { VideoLibrary as SongIcon } from '@material-ui/icons';
import { Authorization } from 'authProvider';
import * as React from 'react';

const {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  ReferenceField,
  ReferenceInput,
  Responsive,
  SelectInput,
  ShowButton,
  SimpleList,
  TextField,
  TextInput,
  FunctionField
} = require('react-admin');

const SongFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Station" source="stationId" reference="stations" allowEmpty>
      <SelectInput optionText="stationId" />
    </ReferenceInput>
  </Filter>
);

export const SongList = (props: any) => (
  <List {...props} filters={<SongFilter />} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Responsive small={<SongSmallDataGrid />} medium={<SongMediumDataGrid permissions={props.permissions} />} />
  </List>
);

export const SongSmallDataGrid = (props: any) => (
  <SimpleList
    {...props}
    leftIcon={(record: any) => (record.thumbnail ? <img src={record.thumbnail} /> : <SongIcon />)}
    primaryText={(record: any) => `${record.title.substring(0, 32)} ${record.title.length > 31 ? '...' : ''}`}
    secondaryText={(record: any) => `${record.duration / 1000} seconds`}
  />
);

export const SongMediumDataGrid = (props: Authorization.PermissionsProps) => (
  <Datagrid {...props}>
    <FunctionField
      label="Thumbnail"
      render={(record: any) => (
        <img
          src={record.thumbnail}
          alt={record.title}
          style={{ width: 144, height: 81, margin: 8, display: 'block', objectFit: 'cover' }}
        />
      )}
    />
    <FunctionField
      label="Title"
      render={(record: any) => <Typography style={{ minWidth: 200, maxWidth: '10vw' }}> {record.title}</Typography>}
    />
    <FunctionField
      label="Title"
      render={(record: any) => (
        <Typography>
          <a style={{ minWidth: 150, maxWidth: '10vw' }} href={record.url} target="_blank" rel="noopener">
            {record.url}
          </a>
        </Typography>
      )}
    />
    <BooleanField label="Played" source="isPlayed" />
    <ReferenceField label="Creator" source="creatorId" reference="users" linkType="show">
      <TextField source="username" />
    </ReferenceField>
    <FunctionField
      label="Score"
      render={(record: any) => (
        <Typography variant="title">{record.upVotes.length - record.downVotes.length}</Typography>
      )}
    />
    <DateField source="createdAt" showTime />
    <FunctionField label="duration" render={(record: any) => `${record.duration / 1000} seconds`} />
    {Authorization.isAdmin(props.permissions) && <EditButton />}
    <ShowButton />
  </Datagrid>
);
