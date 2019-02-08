import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Portal: React.FunctionComponent<Props> = props => {
  const element = React.useMemo(() => document.createElement('div'), []);

  React.useLayoutEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return ReactDOM.createPortal(props.children, element);
};

export default Portal;

export interface Props {}
