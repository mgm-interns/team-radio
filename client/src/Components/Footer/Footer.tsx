import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class CoreFooter extends React.Component<CoreFooter.Props, Footer.States> {
  public render(): React.ReactNode {
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

namespace CoreFooter {
  export interface Props extends Footer.Props, WithStyles<typeof styles> {}
}

export const Footer: React.ComponentType<Footer.Props> = withStyles(styles)(CoreFooter);

export namespace Footer {
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
