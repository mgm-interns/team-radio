import { withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import { Footer, Header } from 'Components';
import React from 'react';
import { styles } from './styles';

class FullLayout extends React.Component<CoreProps, CoreStates> {
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

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(FullLayout);

export interface Props extends Styleable, Identifiable, Container {}
