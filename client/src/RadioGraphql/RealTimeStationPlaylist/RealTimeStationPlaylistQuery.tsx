import gql from 'graphql-tag';
import * as React from 'react';
import { DataProps, DataValue, graphql, OperationOption, Query as GraphQLQuery } from 'react-apollo';
import { PartialQueryProps } from '../types';

export function RealTimeStationPlaylistQuery(props: RealTimeStationPlaylistQuery.Props) {
  return <RealTimeStationPlaylistQuery.QueryComponent query={RealTimeStationPlaylistQuery.QUERY} {...props} />;
}

export namespace RealTimeStationPlaylistQuery {
  export const QUERY = gql`
    query StationPlaylist($stationId: String!) {
      StationPlaylist(stationId: $stationId) {
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

  export interface Playlist {
    readonly playlist: PlaylistSong[];
  }

  export interface PlaylistSong {
    readonly id: string;
    readonly url: string;
    readonly thumbnail: string;
    readonly title: string;
    readonly creatorId: string;
    readonly createdAt: string;
    readonly duration: number;
    readonly upVotes: string[];
    readonly downVotes: string[];
  }

  export interface Response {
    readonly StationPlaylist: Playlist;
  }

  export interface Variables {
    stationId: string;
  }

  export class QueryComponent extends GraphQLQuery<Response, Variables> {}

  export function withHOC<TProps>(options: OperationOption<{}, Response, Variables>) {
    return graphql<TProps, Response, Variables>(QUERY, options);
  }

  export interface WithHOCProps extends DataProps<Response, Variables> {}
  export interface WithHOCData extends DataValue<Response, Variables> {}

  export interface Props extends PartialQueryProps<Response, Variables> {}
}
