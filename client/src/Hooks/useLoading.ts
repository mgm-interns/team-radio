import * as React from 'react';

interface UseLoadingReturnType {
  loading: boolean;
  toggleLoading(): void;
  setLoading(state: boolean): void;
  toggleLoadingOn(): void;
  toggleLoadingOff(): void;
}

export function useLoading(initialState: boolean = false): UseLoadingReturnType {
  const [loading, setState] = React.useState<boolean>(initialState);
  return {
    loading,
    toggleLoading: () => setState(!loading),
    setLoading: state => setState(state),
    toggleLoadingOn: () => setState(true),
    toggleLoadingOff: () => setState(false)
  };
}
