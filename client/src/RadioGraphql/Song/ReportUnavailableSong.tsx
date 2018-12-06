import gql from 'graphql-tag';
import * as React from 'react';
import { graphql, MutateProps, Mutation as GraphQLMutation, OperationOption } from 'react-apollo';
import { PartialMutationProps } from '../types';

const MUTATION = gql`
  mutation reportUnavailableSong($url: String!, $errorCode: Int!, $stationId: String) {
    reportUnavailableSong(url: $url, errorCode: $errorCode, stationId: $stationId)
  }
`;

export class MutationComponent extends GraphQLMutation<Response, Variables> {}

export default function ReportUnavailableSongMutation(props: Props) {
  return <MutationComponent mutation={MUTATION} {...props} />;
}

export function withHOC<TProps>(options?: OperationOption<TProps, Response, Variables>) {
  return graphql<TProps, Response, Variables>(MUTATION, options);
}

export interface Response {
  readonly reportUnavailableSong: boolean;
}

export interface Variables {
  stationId?: string;
  url: string;
  errorCode: number;
}

export interface WithHOCProps extends MutateProps<Response, Variables> {}

export interface Props extends PartialMutationProps<Response, Variables> {}
