import * as React from 'react';
import MediaQuery, { MediaQueryProps } from 'react-responsive';

export function Responsive(props: Responsive.Props) {
  return <MediaQuery {...props} />;
}

export namespace Responsive {
  export const LargeDesktop = (props: Props) => <MediaQuery minWidth={1440} {...props} />;
  export const Desktop = (props: Props) => <MediaQuery minWidth={992} maxWidth={1440} {...props} />;
  export const Tablet = (props: Props) => <MediaQuery minWidth={768} maxWidth={992} {...props} />;
  export const Mobile = (props: Props) => <MediaQuery maxWidth={767} {...props} />;
  export const Default = (props: Props) => <MediaQuery minWidth={768} {...props} />;

  export interface Props extends MediaQueryProps {}
}
