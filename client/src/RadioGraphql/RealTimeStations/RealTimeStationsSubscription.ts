import { SubscribeToMoreOptions } from 'apollo-boost';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {
  AllRealTimeStationsQueryResponse,
  AllRealTimeStationsQueryStation,
  AllRealTimeStationsQueryVariables
} from '.';

const SUBSCRIPTION = gql`
  subscription {
    onStationsChanged {
      id
      stationId
      onlineCount
      createdAt
      isPrivate
      ownerId
      stationName
      thumbnail
    }
  }
`;

export const withHOC = graphql<{}, Response, Variables>(SUBSCRIPTION);

export function getSubscribeToMoreOptions(): SubscribeToMoreOptions<
  AllRealTimeStationsQueryResponse,
  AllRealTimeStationsQueryVariables,
  Response
> {
  return {
    document: SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      return {
        ...prev,
        items: prev.items.map((station: AllRealTimeStationsQueryStation) => {
          if (station.id === subscriptionData.data.onStationsChanged.id) {
            return {
              ...station,
              ...subscriptionData.data.onStationsChanged
            };
          }
          return station;
        })
      };
    }
  };
}

export interface Response {
  readonly onStationsChanged: AllRealTimeStationsQueryStation;
}

export interface Variables {}
