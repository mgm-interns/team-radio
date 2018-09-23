import { Container, Identifiable, Styleable } from 'Common';
import { Footer, Header } from 'Components';
import React from 'react';

class CoreFullLayout extends React.Component<CoreFullLayout.Props> {
  public render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}

namespace CoreFullLayout {
  export interface Props extends FullLayout.Props {}
}

export const FullLayout: React.ComponentType<FullLayout.Props> = CoreFullLayout;

export namespace FullLayout {
  export interface Props extends Styleable, Identifiable, Container {}
  export interface States {}
}
