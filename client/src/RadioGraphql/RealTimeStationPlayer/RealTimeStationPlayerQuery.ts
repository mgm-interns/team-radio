import { ApolloError, NetworkStatus } from 'apollo-boost';
import gql from 'graphql-tag';
import { DataProps, DataValue, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';

export namespace RealTimeStationPlayerQuery {
  export const QUERY = gql`
    query StationPlayer($stationId: String!) {
      StationPlayer(stationId: $stationId) {
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

  export interface Player {
    currentlyPlayingAt: string;

    playing: Playing;

    playlist: PlaylistSong[];
  }

  export interface Playing {
    startedAt: string;

    song: Song;
  }

  export interface Song {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    creatorId: string;
    createdAt: string;
    duration: number;
  }

  export interface PlaylistSong extends Song {
    upVotes: string[];
    downVotes: string[];
  }

  export interface Response {
    StationPlayer: Player;
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

  export const withHOC = <TProps>(options: OperationOption<{}, Response, Variables>) =>
    graphql<TProps, Response, Variables>(QUERY, options);

  export interface WithHOCProps extends DataProps<Response, Variables> {}
  export interface WithHOCData extends DataValue<Response, Variables> {}
}
