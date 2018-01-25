import React, { Fragment } from 'react';
import { NavBar, Footer } from 'Component';
import { compose } from 'redux';
import { withStyles } from 'material-ui/styles';

import Markdown from 'react-markdown';

import styles from './styles';
import scoreSource from './score';

const defaultCover =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUZbD4KRNnATuFo0ZqOOmAU6ecExSjSLxxzDlnTrHgNQs6bvl';

const Help = ({ classes }) => (
  <Fragment>
    <NavBar key={1} color="primary" />
    <div key={2} className={classes.container}>
      <div className={classes.coverContainer}>
        <div className={classes.coverWrapper}>
          <img src={defaultCover} className={classes.backgroundImg} />
        </div>
      </div>
      <div className={classes.wrapper}>
        <Markdown source={scoreSource.content} />
      </div>
    </div>
    <Footer key={3} />
  </Fragment>
);

export default compose(withStyles(styles))(Help);
