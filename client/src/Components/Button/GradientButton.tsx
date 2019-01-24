import { Button, Theme } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { classnames } from '@Themes';
import * as React from 'react';

export const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  button: {
    background: palette.primary.mainGradient
  },
  disabledButton: {
    background: palette.secondary.light
  }
}));

export const GradientButton: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  return (
    <Button
      {...props}
      color={'primary'}
      className={classnames(classes.button, props.className)}
      classes={{ disabled: classes.disabledButton, ...props.classes }}
    />
  );
};

interface CoreProps extends Props {}

export default GradientButton;

export interface Props extends Pick<ButtonProps, Exclude<keyof ButtonProps, 'color'>> {}
