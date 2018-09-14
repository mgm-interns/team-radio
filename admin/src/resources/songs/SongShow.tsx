import { Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { UserMediumDatagrid } from 'resources';
import { SongTitle } from './SongTitle';

const {
  Show,
  TabbedShowLayout,
  Tab,
  DateField,
  TextField,
  BooleanField,
  UrlField,
  ImageField,
  ReferenceField,
  ReferenceArrayField,
  FunctionField
} = require('react-admin');

export const SongShow = (props: any) => (
  <Show title={<SongTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Basic">
        <TextField source="id" />
        <ImageField source="thumbnail" />
        <TextField source="title" />
        <UrlField source="url" />
        <BooleanField label="Played" source="isPlayed" />
        <ReferenceField label="Creator" source="creatorId" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <DateField source="createdAt" showTime />
        <FunctionField label="duration" render={(record: any) => `${record.duration / 1000} seconds`} />
      </Tab>
      <Tab label="Scores">
        <FunctionField
          label="Score"
          render={(record: any) => (
            <Typography variant="headline">{record.upVotes.length - record.downVotes.length}</Typography>
          )}
        />
        <FunctionField addLabel={false} render={() => <Divider />} />
        <FunctionField
          addLabel={false}
          render={(record: any) => (
            <Typography variant="subheading" style={{ marginTop: 16 }}>
              Up votes: {record.upVotes.length}
            </Typography>
          )}
        />
        <ReferenceArrayField addLabel={false} source="upVotes" reference="users">
          <UserMediumDatagrid />
        </ReferenceArrayField>
        <FunctionField addLabel={false} render={() => <Divider style={{ marginTop: 16 }} />} />
        <FunctionField
          addLabel={false}
          render={(record: any) => (
            <Typography variant="subheading" style={{ marginTop: 16 }}>
              Down votes: {record.downVotes.length}
            </Typography>
          )}
        />
        <ReferenceArrayField addLabel={false} source="downVotes" reference="users">
          <UserMediumDatagrid />
        </ReferenceArrayField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
