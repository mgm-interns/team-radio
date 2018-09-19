import * as React from 'react';
import { email, length, required, url } from '../../validator';

const { Create, LongTextInput, SimpleForm, TextInput } = require('react-admin');

export const UserCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <LongTextInput source="email" validate={[email(), length({ min: 6, max: 64 })]} />
      <LongTextInput source="username" validate={[length({ min: 6, max: 32 })]} />
      <TextInput source="password" type="password" validate={[required(), length({ min: 6, max: 32 })]} />
      <LongTextInput source="firstname" />
      <LongTextInput source="lastname" />
      <LongTextInput source="name" />
      <LongTextInput source="city" />
      <LongTextInput source="country" />
      <LongTextInput source="avatarUrl" validate={[url()]} />
      <LongTextInput source="coverUrl" validate={[url()]} />
      <LongTextInput source="facebookId" />
      <LongTextInput source="googleId" />
    </SimpleForm>
  </Create>
);
