import * as React from 'react';
import MediaQuery, { MediaQueryProps } from 'react-responsive';

const Responsive: any = (props: Props) => {
  return <MediaQuery {...props} />;
};

Responsive.LargeDesktop = (props: Props) => <MediaQuery minWidth={1440} {...props} />;
Responsive.Desktop = (props: Props) => <MediaQuery minWidth={992} maxWidth={1440} {...props} />;
Responsive.Tablet = (props: Props) => <MediaQuery minWidth={768} maxWidth={992} {...props} />;
Responsive.Mobile = (props: Props) => <MediaQuery maxWidth={767} {...props} />;
Responsive.Default = (props: Props) => <MediaQuery minWidth={768} {...props} />;

export default Responsive as ResponsiveComponent;

interface ResponsiveComponent {
  (props: Props): React.ReactElement<any>; // tslint:disable-line callable-types
  LargeDesktop: React.FC<Props>;
  Desktop: React.FC<Props>;
  Tablet: React.FC<Props>;
  Mobile: React.FC<Props>;
  Default: React.FC<Props>;
}

export interface Props extends MediaQueryProps {}
