import { Container } from '@Common';
import { useWindowResizeEffect } from '@Hooks';
import * as React from 'react';
import { StationPlayerPositionContext } from './Context';

const StationPlayerPositionContainer: React.FunctionComponent<CoreProps> = ({ children }) => {
  const context = React.useContext(StationPlayerPositionContext);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const updatePositionCallback = React.useCallback(() => {
    const ref = containerRef.current;
    if (ref) {
      const { top, left, width, height } = ref.getBoundingClientRect();
      if (context.top !== top || context.left !== left || context.width !== width || context.height !== height) {
        context.setPosition({ top, left, width, height });
      }
      return () => context.resetPosition();
    }
  }, []);

  React.useLayoutEffect(updatePositionCallback, []);
  useWindowResizeEffect(updatePositionCallback, []);

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
      {children}
    </div>
  );
};

interface CoreProps extends Props {}

export default StationPlayerPositionContainer;

export interface Props extends Container {}
