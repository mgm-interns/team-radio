import { Identifiable, Styleable } from '@Common';
import { Typography } from '@material-ui/core';
import * as React from 'react';
import { useStyles } from './styles';

const Footer: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography color={'inherit'} variant={'body2'}>
        Copyright &copy; 2018 by TeamRadio
      </Typography>
    </div>
  );
};

interface CoreProps extends Props {}

export default Footer;

export interface Props extends Identifiable, Styleable {}
