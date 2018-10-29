import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { RealTimeStationPlayerQuery } from './RealTimeStationPlayerQuery';

export namespace OnRealTimeStationPlayerChangedSubscription {
  export const SUBSCRIPTION = gql`
    subscription onStationPlayerChanged($stationId: String!) {
      onStationPlayerChanged(stationId: $stationId) {
        currentlyPlayingAt
        playing {
          song {
            id
            url
            thumbnail
            title
            creatorId
            createdAt
            duration
          }
          startedAt
        }
        playlist {
          id
          url
          thumbnail
          title
          creatorId
          createdAt
          duration
          upVotes
          downVotes
        }
      }
    }
  `;

  export interface Response {
    onStationPlayerChanged: RealTimeStationPlayerQuery.Player;
  }

  export interface Variables {
    stationId: string;
  }

  export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(SUBSCRIPTION);

  export function getSubscribeToMoreOptions(
    variables: Variables
  ): SubscribeToMoreOptions<RealTimeStationPlayerQuery.Response, RealTimeStationPlayerQuery.Variables, Response> {
    return {
      variables,
      document: SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          ...prev,
          StationPlayer: subscriptionData.data.onStationPlayerChanged
        };
      }
    };
  }
}
