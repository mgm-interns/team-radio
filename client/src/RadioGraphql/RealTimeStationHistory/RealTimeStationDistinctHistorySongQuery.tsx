import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, DataValue, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { PartialQueryProps } from '../types';

const QUERY = gql`
  query allDistinctHistorySongs($stationId: String!, $perPage: Int, $page: Int) {
    allDistinctHistorySongs(filter: { stationId: $stationId }, perPage: $perPage, page: $page) {
      title
      url
      thumbnail
      duration
      createdAt
      creatorId
    }
  }
`;

export class QueryComponent extends GraphQLQuery<Response, Variables> {}

export default function RealTimeStationPlaylistQuery(props: Props) {
  return <QueryComponent query={QUERY} {...props} />;
}

export function withHOC<TProps>(options: OperationOption<{}, Response, Variables>) {
  return graphql<TProps, Response, Variables>(QUERY, options);
}

export interface Song {
  readonly title: string;
  readonly url: string;
  readonly thumbnail: string;
  readonly duration: number;
  readonly createdAt: number;
  readonly creatorId: string;
}

export interface Response {
  readonly allDistinctHistorySongs: Song[];
}

export interface Variables {
  stationId: string;
  perPage?: number;
  page?: number;
}

export interface WithHOCProps extends DataProps<Response, Variables> {}
export interface WithHOCData extends DataValue<Response, Variables> {}

export interface Props extends PartialQueryProps<Response, Variables> {}
