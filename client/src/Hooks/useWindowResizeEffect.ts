import * as React from 'react';

type WindowResizeEffectCallbackFunction<T> = (event?: T | Event) => void;

export function useWindowResizeEffect<T extends Event>(
  callback: WindowResizeEffectCallbackFunction<T>,
  inputs?: React.DependencyList
): void {
  React.useEffect(() => {
    window.addEventListener('resize', callback);
    return () => {
      window.removeEventListener('resize', callback);
    };
  }, inputs);
}
