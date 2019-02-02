import { FetchPolicy, OperationVariables } from 'apollo-client';
import { DocumentNode, GraphQLError } from 'graphql';
import * as React from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import isEqual from 'react-fast-compare';

export interface UseSubscriptionOptions<TVariables> {
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
}

export interface UseSubscriptionReturnType<TResponse> {
  data: TResponse | { [key: string]: void };
  error: GraphQLError | null;
  loading: boolean;
}

export function useSubscription<TResponse, TVariables = OperationVariables>(
  query: DocumentNode,
  options: UseSubscriptionOptions<TVariables> = {}
): UseSubscriptionReturnType<TResponse> {
  const prevOptions = React.useRef<typeof options | null>(null);
  const client = useApolloClient();
  const [data, setData] = React.useState<TResponse | {}>({});
  const [error, setError] = React.useState<GraphQLError | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    prevOptions.current = options;
    const subscription = client
      .subscribe<{ data: TResponse }, TVariables>({
        ...options,
        query
      })
      .subscribe({
        next: value => {
          setData(value.data);
        },
        error: err => {
          setError(err);
          setLoading(false);
        },
        complete: () => {
          setLoading(false);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [query, isEqual(prevOptions.current, options) ? prevOptions.current : options]);

  return React.useMemo(() => ({ data, error, loading }), [data, error, loading]);
}
