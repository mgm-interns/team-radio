import * as React from 'react';

interface ToggleActions {
  toggle(): void;
  setToggleState(state: boolean): void;
  toggleOn(): void;
  toggleOff(): void;
}

type UseToggleReturnType = [boolean, ToggleActions];

export function useToggle(initialState: boolean = false): UseToggleReturnType {
  const [state, setState] = React.useState<boolean>(initialState);
  return [
    state,
    {
      toggle: () => setState(!state),
      setToggleState: newState => setState(newState),
      toggleOn: () => setState(true),
      toggleOff: () => setState(false)
    }
  ];
}
