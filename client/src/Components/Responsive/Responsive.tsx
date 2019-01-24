import * as React from 'react';
import MediaQuery, { MediaQueryProps } from 'react-responsive';

const Query = (props: Props) => <MediaQuery {...props} />;
const LargeDesktop = (props: Props) => <MediaQuery minWidth={1440} {...props} />;
const Desktop = (props: Props) => <MediaQuery minWidth={992} maxWidth={1440} {...props} />;
const Tablet = (props: Props) => <MediaQuery minWidth={768} maxWidth={992} {...props} />;
const Mobile = (props: Props) => <MediaQuery maxWidth={767} {...props} />;
const Default = (props: Props) => <MediaQuery minWidth={768} {...props} />;

export { Query, LargeDesktop, Desktop, Tablet, Mobile, Default };

interface ResponsiveComponent {
  (props: Props): React.ReactElement<{}>; // tslint:disable-line callable-types
  LargeDesktop: React.FunctionComponent<Props>;
  Desktop: React.FunctionComponent<Props>;
  Tablet: React.FunctionComponent<Props>;
  Mobile: React.FunctionComponent<Props>;
  Default: React.FunctionComponent<Props>;
}

export interface Props extends MediaQueryProps {}
