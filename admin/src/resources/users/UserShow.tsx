import * as React from 'react';
import { UserTitle } from './UserTitle';

const { EmailField, Show, SimpleShowLayout, TextField, ImageField } = require('react-admin');

export const UserShow = (props: any) => (
  <Show title={<UserTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="firstname" />
      <TextField source="lastname" />
      <TextField source="city" />
      <TextField source="country" />
      <TextField source="reputation" />
      <TextField source="facebookId" />
      <TextField source="googleId" />
      <ImageField source="avatarUrl" />
      <ImageField source="coverUrl" />
    </SimpleShowLayout>
  </Show>
);
