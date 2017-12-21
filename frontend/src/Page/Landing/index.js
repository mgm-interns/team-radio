import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

import NavBar from '../../Component/NavBar';
import Footer from '../../Component/Footer';

import Backdrop from './Backdrop';
import PopularStation from './PopularStation';
import Section from './Section';

class Landing extends Component {
  render() {
    return (
      <Grid container>
        <NavBar />
        <Backdrop />
        <PopularStation />
        <Section />
        <Footer />
      </Grid>
    );
  }
}

export default Landing;
