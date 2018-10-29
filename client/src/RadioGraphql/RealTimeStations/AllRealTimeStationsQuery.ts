import { ApolloError, NetworkStatus } from 'apollo-boost';
import gql from 'graphql-tag';
import { DataProps, graphql, Query as GraphQLQuery } from 'react-apollo';

export namespace AllRealTimeStationsQuery {
  export const QUERY = gql`
    {
      allRealTimeStations {
        id
        createdAt
        isPrivate
        ownerId
        stationId
        stationName
        onlineCount
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

    onlineCount: number;
  }

  export interface Response {
    allRealTimeStations: Station[];
  }

  export interface Variables {}

  export class Query extends GraphQLQuery<Response, Variables> {}

  export interface QueryResult {
    data?: Response;
    error?: ApolloError;
    loading: boolean;
    networkStatus: NetworkStatus;
  }

  export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(QUERY);

  export interface WithHOCProps extends DataProps<Response, Variables> {}
}
