import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

class Footer extends React.Component<CoreProps, CoreStates> {
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

interface CoreProps extends Props, WithStyles<typeof styles> {}
interface CoreStates {}

export default withStyles(styles)(Footer);

export interface Props extends Identifiable, Styleable {}
