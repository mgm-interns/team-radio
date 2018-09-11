import * as React from 'react';
import { StationTitle } from './StationTitle';

const { Show, SimpleShowLayout, TextField } = require('react-admin');

export const StationShow = (props: any) => (
  <Show title={<StationTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="createdAt" />
      <TextField source="stationName" />
      <TextField source="stationId" label="Station slug" />
    </SimpleShowLayout>
  </Show>
);
