import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { PartialQueryProps } from '../types';

export function RealTimeStationQuery(props: RealTimeStationQuery.Props) {
  return <RealTimeStationQuery.QueryComponent query={RealTimeStationQuery.QUERY} {...props} />;
}

export namespace RealTimeStationQuery {
  export const QUERY = gql`
    query RealTimeStation($stationId: String!) {
      RealTimeStation(stationId: $stationId) {
        id
        stationId
        stationName
        createdAt
        startingTime
        currentPlayingSongId
        ownerId
        isPrivate
        onlineCount
        onlineUsers {
          id
          email
          username
          avatarUrl
        }
        onlineAnonymous {
          clientId
        }
      }
    }
  `;

  export interface Station {
    readonly id: string;
    readonly stationId: string;
    readonly stationName: string;
    readonly createdAt: string;
    readonly ownerId: string;
    readonly isPrivate: boolean;
    readonly currentPlayingSongId: string;
    readonly startingTime: string;
    readonly onlineCount: number;
    readonly onlineUsers: OnlineUser[];
    readonly onlineAnonymous: OnlineAnonymous[];
  }

  export interface OnlineUser {
    readonly id: string;
    readonly email: string;
    readonly username: string;
    readonly avatarUrl: string;
  }

  export interface OnlineAnonymous {
    readonly clientId: string;
  }

  export interface Response {
    readonly RealTimeStation: Station;
  }

  export interface Variables {
    stationId: string;
  }

  export class QueryComponent extends GraphQLQuery<Response, Variables> {}

  export function withHOC<TProps>(options: OperationOption<TProps, Response, Variables>) {
    return graphql<TProps, Response, Variables>(QUERY, options);
  }

  export interface WithHOCProps extends DataProps<Response, Variables> {}

  export interface Props extends PartialQueryProps<Response, Variables> {}
}
