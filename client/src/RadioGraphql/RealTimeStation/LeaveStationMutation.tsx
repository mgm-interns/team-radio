import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, Mutation as GraphQLMutation, MutationFn, OperationOption } from 'react-apollo';
import { PartialMutationProps } from '../types';

const MUTATION = gql`
  mutation leaveStation($stationId: String!) {
    leaveStation(stationId: $stationId)
  }
`;

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

export default function LeaveStationMutation(props: Props) {
  return <MutationComponent mutation={MUTATION} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql<TProps, Response, Variables>(MUTATION, {
    name: 'leaveStation',
    ...options
  });
}

export interface Response {
  readonly leaveStation: boolean;
}

export interface Variables {
  stationId: string;
}

export interface WithHOCProps {
  leaveStation: MutationFn<Response, Variables>;
}

export interface Props extends PartialMutationProps<Response, Variables> {}
