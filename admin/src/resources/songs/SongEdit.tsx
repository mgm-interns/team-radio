import * as React from 'react';
import { length, numericality, url } from 'validator';
import { SongTitle } from './SongTitle';

const {
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  LongTextInput,
  BooleanInput,
  ReferenceArrayInput,
  SelectArrayInput
} = require('react-admin');

export const SongEdit = (props: any) => (
  <Edit title={<SongTitle />} {...props}>
    <SimpleForm>
      <LongTextInput source="id" disabled />
      <LongTextInput source="thumbnail" validate={[url()]} />
      <LongTextInput source="title" validate={[length({ min: 1, max: 128 })]} />
      <LongTextInput source="url" validate={[url()]} />
      <BooleanInput source="isPlayed" />
      <ReferenceInput label="Creator" source="creatorId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
      <LongTextInput source="createdAt" disabled />
      <LongTextInput label="Duration (in seconds)" source="duration" validate={[numericality()]} />
      <ReferenceArrayInput label="Up votes" source="upVotes" reference="users">
        <SelectArrayInput optionText="username" />
      </ReferenceArrayInput>
      <ReferenceArrayInput label="Down votes" source="downVotes" reference="users">
        <SelectArrayInput optionText="username" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);
