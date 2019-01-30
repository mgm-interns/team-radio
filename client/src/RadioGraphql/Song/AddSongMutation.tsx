import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, MutateProps, Mutation as GraphQLMutation, OperationOption } from 'react-apollo';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { MutationHookOptions } from 'react-apollo-hooks/lib/useMutation';
import { PartialMutationProps } from '../types';

export const MUTATION = gql`
  mutation addSong($url: String!) {
    addSong(url: $url) {
      id
    }
  }
`;

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

export default function JoinStationMutation(props: Props) {
  return <MutationComponent mutation={MUTATION} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql(MUTATION, options);
}

export function useMutation(options?: MutationHookOptions<Response, Variables>) {
  return ReactApolloHooks.useMutation<Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly addSong: {
    readonly id: string;
  };
}

export interface Variables {
  url: string;
}

export interface WithHOCProps extends MutateProps<Response, Variables> {}

export interface Props extends PartialMutationProps<Response, Variables> {}
