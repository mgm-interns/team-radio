import * as React from 'react';

/**
 * Reference: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 */
export function usePrevious<T>(value: T): T | undefined {
  // Create a ref object to store the value
  const ref = React.useRef<T | undefined>(undefined);

  // Update the ref object each time the value is updated
  React.useEffect(
    () => {
      ref.current = value;
    },
    [value] // Run only when the value updates
  );

  // Returns the previous value immediately (will be undefined on the first run)
  return ref.current;
}
