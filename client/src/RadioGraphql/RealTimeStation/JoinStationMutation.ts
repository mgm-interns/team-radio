import gql from 'graphql-tag';
import { graphql, MutateProps, Mutation as GraphQLMutation, OperationOption } from 'react-apollo';

/**
 * No need to define LeaveStation mutation
 * because of the server has an utility to remove when user join another station
 */
export namespace JoinStationMutation {
  export const MUTATION = gql`
    mutation joinStation($stationId: String!) {
      joinStation(stationId: $stationId)
    }
  `;

  export interface Response {
    joinStation: boolean;
  }

  export interface Variables {
    stationId: string;
  }

  export class Mutation extends GraphQLMutation<Response, Variables> {}

  export const withHOC = <TProps>(options: OperationOption<TProps, Response, Variables>) =>
    graphql<TProps, Response, Variables>(MUTATION, options);

  export interface WithHOCProps extends MutateProps<Response, Variables> {}
}
