import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';

export const QUERY = gql`
  query allDistinctHistorySongs($stationId: String!, $perPage: Int, $page: Int) {
    items: allDistinctHistorySongs(filter: { stationId: $stationId }, perPage: $perPage, page: $page) {
      title
      url
      thumbnail
      duration
      createdAt
      creatorId
    }
  }
`;

export function useQuery(options: QueryHookOptions<Variables>) {
  return ReactApolloHooks.useQuery<Response, Variables>(QUERY, options);
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
  readonly items: Song[];
}

export interface Variables {
  stationId: string;
  perPage?: number;
  page?: number;
}
