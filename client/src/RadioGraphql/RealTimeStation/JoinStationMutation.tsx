/**
 * No need to define LeaveStation mutation
 * because of the server has an utility to remove when user join another station
 */
import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, MutateProps, Mutation as GraphQLMutation, OperationOption } from 'react-apollo';
import { PartialMutationProps } from '../types';

const MUTATION = gql`
  mutation joinStation($stationId: String!) {
    joinStation(stationId: $stationId)
  }
`;

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

export default function JoinStationMutation(props: Props) {
  return <MutationComponent mutation={MUTATION} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql<TProps, Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly joinStation: boolean;
}

export interface Variables {
  stationId: string;
}

export interface WithHOCProps extends MutateProps<Response, Variables> {}

export interface Props extends PartialMutationProps<Response, Variables> {}
