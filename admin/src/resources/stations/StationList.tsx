import { Radio as StationIcon } from '@material-ui/icons';
import * as React from 'react';

const {
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
  TextInput
} = require('react-admin');

const StationFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Owner" source="ownerId" reference="users" allowEmpty>
      <SelectInput optionText="username" />
    </ReferenceInput>
  </Filter>
);

export const StationList = (props: any) => (
  <List {...props} filters={<StationFilter />}>
    <Responsive
      small={
        <SimpleList
          leftAvatar={() => <StationIcon />}
          primaryText={(record: any) => record.stationName}
          secondaryText={(record: any) => record.stationId}
        />
      }
      medium={
        <Datagrid>
          <TextField source="stationId" />
          <TextField source="stationName" />
          <ReferenceField label="Owner" source="ownerId" reference="users">
            <TextField source="username" />
          </ReferenceField>
          <DateField source="createdAt" />
          <DateField source="startingTime" showTime={true} />
          <EditButton />
          <ShowButton />
        </Datagrid>
      }
    />
  </List>
);
