import gql from 'graphql-tag';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { QueryHookOptions } from 'react-apollo-hooks/lib/useQuery';

export const QUERY = gql`
  {
    items: allRealTimeStations {
      id
      createdAt
      isPrivate
      ownerId
      stationId
      stationName
      onlineCount
      thumbnail
    }
  }
`;

export function useQuery(options?: QueryHookOptions<Variables>) {
  return ReactApolloHooks.useQuery<Response, Variables>(QUERY, options);
}

export interface Station {
  readonly id: string;
  readonly stationId: string;
  readonly stationName: string;
  readonly createdAt: number;
  readonly ownerId: string;
  readonly isPrivate: boolean;
  readonly onlineCount: number;
  readonly thumbnail?: string;
}

export interface Response {
  readonly items: Station[];
}

export interface Variables {}
