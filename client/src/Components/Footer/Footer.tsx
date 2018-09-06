import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

export class CoreFooter extends React.Component<Footer.CoreProps, Footer.States> {
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Typography color={'inherit'} variant={'body2'}>
          Copyright &copy; 2018 by TeamRadio
        </Typography>
      </div>
    );
  }
}

export const Footer = withStyles(styles)(CoreFooter);

export namespace Footer {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
