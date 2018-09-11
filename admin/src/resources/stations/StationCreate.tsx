import * as React from 'react';
import { length, required, slug } from 'validator';

const { Create, LongTextInput, ReferenceInput, SelectInput, SimpleForm } = require('react-admin');

export const StationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <LongTextInput source="stationName" validate={[required(), length({ min: 6, max: 32 })]} />
      <LongTextInput source="stationId" label="Station slug name" validate={[slug()]} />
      <ReferenceInput label="Owner" source="ownerId" reference="users" validate={[required()]}>
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
