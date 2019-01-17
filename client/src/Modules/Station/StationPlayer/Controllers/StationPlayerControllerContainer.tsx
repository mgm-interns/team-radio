import { Container } from 'Common';
import * as React from 'react';
import { StationPlayerController } from './Context';

const StationPlayerControllerContainer: React.FunctionComponent<CoreProps> = ({ children }) => {
  const stationPlayerControllerContext = React.useContext(StationPlayerController);
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    stationPlayerControllerContext.setContainer({ container: containerRef.current });
  });
  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerRef}>
      {children}
    </div>
  );
};

interface CoreProps extends Props {}

export default StationPlayerControllerContainer;

export interface Props extends Container {}
