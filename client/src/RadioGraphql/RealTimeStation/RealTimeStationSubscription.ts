import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { RealTimeStationQueryResponse, RealTimeStationQueryStation, RealTimeStationQueryVariables } from '.';

const SUBSCRIPTION = gql`
  subscription onStationChanged($stationId: String!) {
    onStationChanged(stationId: $stationId) {
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

export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(SUBSCRIPTION);

export function getSubscribeToMoreOptions(
  params: Variables
): SubscribeToMoreOptions<RealTimeStationQueryResponse, RealTimeStationQueryVariables, Response> {
  return {
    document: SUBSCRIPTION,
    variables: params,
    updateQuery: (prev: RealTimeStationQueryResponse, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      // TODO: Implement subscription for real time station
      return prev;
    }
  };
}

export interface Response {
  readonly onStationChanged: RealTimeStationQueryStation;
}

export interface Variables {
  stationId: string;
}
