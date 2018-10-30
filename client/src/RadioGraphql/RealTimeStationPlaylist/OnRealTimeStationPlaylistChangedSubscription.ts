import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { RealTimeStationPlaylistQuery } from './RealTimeStationPlaylistQuery';

export namespace OnRealTimeStationPlaylistChangedSubscription {
  export const SUBSCRIPTION = gql`
    subscription onStationPlaylistChanged($stationId: String!) {
      onStationPlaylistChanged(stationId: $stationId) {
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
    readonly onStationPlaylistChanged: RealTimeStationPlaylistQuery.Playlist;
  }

  export interface Variables {
    stationId: string;
  }

  export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(SUBSCRIPTION);

  export function getSubscribeToMoreOptions(
    variables: Variables
  ): SubscribeToMoreOptions<RealTimeStationPlaylistQuery.Response, RealTimeStationPlaylistQuery.Variables, Response> {
    return {
      variables,
      document: SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        return {
          ...prev,
          StationPlaylist: subscriptionData.data.onStationPlaylistChanged
        };
      }
    };
  }
}
