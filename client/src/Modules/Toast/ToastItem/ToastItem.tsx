import { Icon, IconButton, SnackbarContent, Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import * as React from 'react';
import { MdClose, MdWarning } from 'react-icons/md';
import { classnames } from '@Themes';
import { Toast, ToastDelay, ToastSeverity } from '../reducer';
import { useStyles } from './styles';

export const ToastItem: React.FunctionComponent<Props> = props => {
  const classes = useStyles();

  React.useEffect(() => {
    if (props.delay !== ToastDelay.INFINITY) {
      const fn = setTimeout(() => {
        props.onClose(props.id);
      }, props.delay);

      return () => clearTimeout(fn);
    }
  }, [props.delay, props.id]);

  const theme = useTheme<Theme>();
  const background = React.useMemo<string | undefined>(() => {
    switch (props.severity) {
      case ToastSeverity.ERROR:
        return theme.palette.error.mainGradient;
      case ToastSeverity.WARNING:
        return theme.palette.warning.mainGradient;
      case ToastSeverity.INFO:
        return undefined;
    }
  }, [theme, props.severity]);
  return (
    <SnackbarContent
      style={{ background }}
      className={classes.container}
      message={
        <span className={classes.message}>
          <MdWarning className={classnames(classes.icon, classes.iconVariant)} />
          {props.message}
        </span>
      }
      action={
        <IconButton className={classnames(classes.icon)} color={'inherit'} onClick={() => props.onClose(props.id)}>
          <MdClose />
        </IconButton>
      }
    />
  );
};

export default ToastItem;

export interface Props extends Toast {
  onClose(key: string): void;
}
