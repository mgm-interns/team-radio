import * as React from 'react';
import { email, length, url } from 'validator';
import { UserTitle } from './UserTitle';

const { Edit, LongTextInput, SimpleForm } = require('react-admin');

export const UserEdit = (props: any) => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <LongTextInput source="id" disabled />
      <LongTextInput source="email" validate={[email(), length({ min: 6, max: 64 })]} />
      <LongTextInput source="username" validate={[length({ min: 6, max: 32 })]} />
      <LongTextInput source="firstname" />
      <LongTextInput source="lastname" />
      <LongTextInput source="name" />
      <LongTextInput source="city" />
      <LongTextInput source="country" />
      <LongTextInput source="avatarUrl" validate={[url()]} />
      <LongTextInput source="coverUrl" validate={[url()]} />
      <LongTextInput source="reputation" disabled />
      <LongTextInput source="facebookId" disabled />
      <LongTextInput source="googleId" disabled />
    </SimpleForm>
  </Edit>
);
