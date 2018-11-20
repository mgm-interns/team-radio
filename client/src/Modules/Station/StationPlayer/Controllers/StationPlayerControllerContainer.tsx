import { Container } from 'Common';
import * as React from 'react';
import { StationPlayerController } from './Context';

function StationPlayerControllerContainer({ children }: CoreProps) {
  return (
    <StationPlayerController.Consumer>
      {({ setContainer }) => (
        <div
          style={{ width: '100%', height: '100%' }}
          ref={(ref: React.ReactInstance) => {
            setContainer({ container: ref });
          }}
        >
          {children}
        </div>
      )}
    </StationPlayerController.Consumer>
  );
}

interface CoreProps extends Props {}

export default StationPlayerControllerContainer;

export interface Props extends Container {}
