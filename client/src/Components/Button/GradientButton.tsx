import { Button, withStyles, WithStyles } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { styles } from './styles';

export const GradientButton = ({ classes, className, ...props }: CoreProps) => (
  <Button
    color={'primary'}
    className={classnames(classes.button, className)}
    classes={{ disabled: classes.disabledButton }}
    {...props}
  />
);

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(GradientButton);

export interface Props
  extends Identifiable,
    Styleable,
    Container,
    Pick<ButtonProps, Exclude<Exclude<keyof ButtonProps, 'classes'>, 'color'>> {}
