import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { RealTimeStationQuery } from './RealTimeStationQuery';

export namespace OnRealTimeStationChangedSubscription {
  export const SUBSCRIPTION = gql`
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

  export interface Response {
    readonly onStationChanged: RealTimeStationQuery.Station;
  }

  export interface Variables {
    stationId: string;
  }

  export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(SUBSCRIPTION);

  export function getSubscribeToMoreOptions(): SubscribeToMoreOptions<
    RealTimeStationQuery.Response,
    RealTimeStationQuery.Variables,
    Response
  > {
    return {
      document: SUBSCRIPTION,
      updateQuery: (prev: RealTimeStationQuery.Response, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // TODO: Implement subscription for real time station
        return prev;
      }
    };
  }
}
