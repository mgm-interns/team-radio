import { SubscribeToMoreOptions } from 'apollo-boost';
import * as React from 'react';
import { DataValue } from 'react-apollo';

export function useSubscription<Response, Variables>(
  data: DataValue<Response, Variables>,
  subscriptionOptions: SubscribeToMoreOptions<Response, Variables, any>
) {
  React.useEffect(
    () => {
      return data.subscribeToMore(subscriptionOptions);
    },
    [subscriptionOptions]
  );
}
