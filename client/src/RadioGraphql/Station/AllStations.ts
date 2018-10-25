import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export namespace AllStations {
  export const getAllStationsQuery = gql`
    {
      allStations {
        id
        createdAt
        isPrivate
        ownerId
        stationId
        stationName
      }
    }
  `;

  export interface Station {
    id: string;

    stationId: string;

    stationName: string;

    createdAt: number;

    ownerId: string;

    isPrivate: boolean;
  }

  export interface Response {
    station: Station;
  }

  export interface Variables {}

  export const withAllStations = graphql<{}, Response, Variables>(getAllStationsQuery);
}
