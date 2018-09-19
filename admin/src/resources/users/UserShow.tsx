import * as React from 'react';
import { StationMediumDatagrid } from 'resources';
import { UserTitle } from './UserTitle';

const { EmailField, Show, TabbedShowLayout, Tab, TextField, ImageField, ReferenceManyField } = require('react-admin');

export const UserShow = (props: any) => (
  <Show title={<UserTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Basic">
        <TextField source="id" />
        <ImageField source="avatarUrl" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="firstname" />
        <TextField source="lastname" />
        <TextField source="name" />
        <TextField source="city" />
        <TextField source="country" />
        <TextField source="reputation" />
        <TextField source="facebookId" />
        <TextField source="googleId" />
        <ImageField source="coverUrl" />
      </Tab>
      <Tab label="Stations">
        <ReferenceManyField label="" reference="stations" target="owner">
          <StationMediumDatagrid />
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
