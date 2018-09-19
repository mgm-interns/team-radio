import { Create as CreateIcon, Radio as StationIcon } from '@material-ui/icons';
import { Authorization } from 'authProvider';
import * as React from 'react';
import { Link } from 'react-router-dom';

const { Button } = require('@material-ui/core');
const {
  Datagrid,
  DateField,
  linkToRecord,
  FunctionField,
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
  <List {...props} filters={<StationFilter />} sort={{ field: 'createdAt', order: 'ASC' }}>
    <Responsive
      small={
        <SimpleList
          leftAvatar={() => <StationIcon />}
          primaryText={(record: any) => record.stationName}
          secondaryText={(record: any) => record.stationId}
        />
      }
      medium={<StationMediumDatagrid permissions={props.permissions} />}
    />
  </List>
);

export const StationMediumDatagrid = (props: Authorization.PermissionsProps & any) => {
  return (
    <Datagrid {...props}>
      <TextField source="stationId" />
      <TextField source="stationName" />
      <ReferenceField label="Owner" source="ownerId" reference="users" linkType="show">
        <TextField source="username" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="startingTime" showTime={true} />
      <FunctionField
        render={(record: any) =>
          Authorization.isStationOwner(props.permissions, record.id) && (
            <Button color="primary" component={Link} to={linkToRecord(props.basePath, record.id)}>
              <CreateIcon style={{ marginRight: 8 }} />
              Edit
            </Button>
          )
        }
      />
      <ShowButton />
    </Datagrid>
  );
};
