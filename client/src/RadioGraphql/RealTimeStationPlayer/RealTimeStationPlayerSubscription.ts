import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  RealTimeStationPlayerQueryPlayer,
  RealTimeStationPlayerQueryResponse,
  RealTimeStationPlayerQueryVariables
} from '.';

const SUBSCRIPTION = gql`
  subscription onStationPlayerChanged($stationId: String!) {
    onStationPlayerChanged(stationId: $stationId) {
      playing {
        id
        url
        thumbnail
        highQualityThumbnail
        title
        creatorId
        createdAt
        duration
      }
      currentlyPlayingAt
      startedAt
      playlistCount
      nextSongThumbnail
    }
  }
`;

export const withHOC = <TProps>() => graphql<TProps, Response, Variables>(SUBSCRIPTION);

export function getSubscribeToMoreOptions(
  variables: Variables
): SubscribeToMoreOptions<RealTimeStationPlayerQueryResponse, RealTimeStationPlayerQueryVariables, Response> {
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

export interface Response {
  readonly onStationPlayerChanged: RealTimeStationPlayerQueryPlayer;
}

export interface Variables {
  stationId: string;
}
