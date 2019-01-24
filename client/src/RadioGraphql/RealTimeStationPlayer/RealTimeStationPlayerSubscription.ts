import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { RealTimeStationPlayerQuery } from '.';

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
): SubscribeToMoreOptions<RealTimeStationPlayerQuery.Response, RealTimeStationPlayerQuery.Variables, Response> {
  return {
    variables,
    document: SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      return {
        ...prev,
        player: subscriptionData.data.onStationPlayerChanged
      };
    }
  };
}

export interface Response {
  readonly onStationPlayerChanged: RealTimeStationPlayerQuery.Player;
}

export interface Variables {
  stationId: string;
}
