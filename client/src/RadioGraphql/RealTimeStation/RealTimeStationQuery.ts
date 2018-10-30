import { ApolloError, NetworkStatus } from 'apollo-boost';
import gql from 'graphql-tag';
import { DataProps, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';

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
    id: string;

    stationId: string;

    stationName: string;

    createdAt: string;

    ownerId: string;

    isPrivate: boolean;

    currentPlayingSongId: string;

    startingTime: string;

    onlineCount: number;

    onlineUsers: OnlineUser[];

    onlineAnonymous: OnlineAnonymous[];
  }

  export interface OnlineUser {
    id: string;
    email: string;
    username: string;
    avatarUrl: string;
  }

  export interface OnlineAnonymous {
    clientId: string;
  }

  export interface Response {
    RealTimeStation: Station;
  }

  export interface Variables {
    stationId: string;
  }

  export interface QueryResult {
    data?: Response;
    error?: ApolloError;
    loading: boolean;
    networkStatus: NetworkStatus;
  }

  export class Query extends GraphQLQuery<Response, Variables> {}

  export const withHOC = <TProps>(options: OperationOption<TProps, Response, Variables>) =>
    graphql<TProps, Response, Variables>(QUERY, options);

  export interface WithHOCProps extends DataProps<Response, Variables> {}
}
