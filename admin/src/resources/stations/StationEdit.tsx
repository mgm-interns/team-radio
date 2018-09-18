import { Authorization } from 'authProvider';
import { FormSelector } from 'helper';
import * as React from 'react';
import { connect } from 'react-redux';
import { StationTitle } from './StationTitle';

const { Edit, ReferenceInput, SelectInput, SimpleForm, LongTextInput } = require('react-admin');

export const CoreStationEdit = (props: CoreStationEdit.Props) => {
  const { recordId, ...otherProps } = props;
  return (
    <Edit title={<StationTitle />} {...otherProps}>
      <SimpleForm>
        <LongTextInput source="id" disabled />
        <LongTextInput source="createdAt" disabled />
        {Authorization.isStationOwner(props.permissions, recordId) && [
          <LongTextInput key="stationName" source="stationName" />,
          <LongTextInput key="stationId" source="stationId" label="Station slug name" />
        ]}
        {Authorization.isAdmin(props.permissions) && (
          <ReferenceInput label="Owner" source="ownerId" reference="users">
            <SelectInput optionText="username" />
          </ReferenceInput>
        )}
      </SimpleForm>
    </Edit>
  );
};

export namespace CoreStationEdit {
  export interface Props extends Authorization.PermissionsProps, StateProps, StationEdit.Props {}

  export interface StateProps {
    recordId: string | undefined;
  }
}

export const StationEdit = connect<CoreStationEdit.StateProps, {}, StationEdit.Props>(
  (state: any) => ({
    recordId: FormSelector.getFormRecordField<string>(state, 'id')
  }),
  () => ({})
)(CoreStationEdit);

export namespace StationEdit {
  export interface Props {}
}
