import { withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import { Footer, Header } from 'Components';
import React from 'react';
import { styles } from './styles';

class CoreFullLayout extends React.Component<CoreFullLayout.Props> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className={classes.body}>{this.props.children}</div>
        <Footer />
      </React.Fragment>
    );
  }
}

namespace CoreFullLayout {
  export interface Props extends FullLayout.Props, WithStyles<typeof styles> {}
}

export const FullLayout: React.ComponentType<FullLayout.Props> = withStyles(styles)(CoreFullLayout);

export namespace FullLayout {
  export interface Props extends Styleable, Identifiable, Container {}
  export interface States {}
}
