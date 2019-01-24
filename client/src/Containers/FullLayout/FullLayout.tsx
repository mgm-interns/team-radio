import { Container, Identifiable, Styleable } from '@Common';
import { Footer, Header } from '@Components';
import * as React from 'react';
import { useStyles } from './styles';

const FullLayout: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.body}>{props.children}</div>
      <Footer />
    </>
  );
};

interface CoreProps extends Props {}

export default FullLayout;

export interface Props extends Styleable, Identifiable, Container {}
