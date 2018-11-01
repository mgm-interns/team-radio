import { withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import { Footer, Header } from 'Components';
import * as React from 'react';
import { styles } from './styles';

class FullLayout extends React.Component<CoreProps, CoreStates> {
  public render() {
    const { classes } = this.props;

    return (
      <>
        <Header />
        <div className={classes.body}>{this.props.children}</div>
        <Footer />
      </>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(FullLayout);

export interface Props extends Styleable, Identifiable, Container {}
