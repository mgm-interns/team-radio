import * as React from 'react';
import { StationTitle } from './StationTitle';

const { Edit, ReferenceInput, SelectInput, SimpleForm, LongTextInput } = require('react-admin');

export const StationEdit = (props: any) => (
  <Edit title={<StationTitle />} {...props}>
    <SimpleForm>
      <LongTextInput source="id" disabled />
      <LongTextInput source="createdAt" disabled />
      <LongTextInput source="stationName" />
      <LongTextInput source="stationId" label="Station slug name" />
      <ReferenceInput label="Owner" source="ownerId" reference="users">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
