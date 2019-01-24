import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, Mutation as GraphQLMutation, MutationFn, OperationOption } from 'react-apollo';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { MutationHookOptions } from 'react-apollo-hooks/lib/useMutation';
import { PartialMutationProps } from '../types';

export const MUTATION = gql`
  mutation joinStation($stationId: String!) {
    joinStation(stationId: $stationId)
  }
`;

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

export default function JoinStationMutation(props: Props) {
  return <MutationComponent mutation={MUTATION} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql(MUTATION, {
    name: 'joinStation',
    ...options
  });
}

export function useMutation(options?: MutationHookOptions<Response, Variables>) {
  return ReactApolloHooks.useMutation<Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly joinStation: boolean;
}

export interface Variables {
  stationId: string;
}

export interface WithHOCProps {
  joinStation: MutationFn<Response, Variables>;
}

export interface Props extends PartialMutationProps<Response, Variables> {}
