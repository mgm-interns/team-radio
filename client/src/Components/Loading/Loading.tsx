import { CircularProgress } from '@material-ui/core';
import { Identifiable, InContainer, Styleable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { useStyles } from './styles';

const Loading: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { fullScreen, className, style, id, size, color } = props;
  return (
    <div
      className={classnames(classes.container, className, { [classes.fullScreen]: fullScreen })}
      style={style}
      id={id}
    >
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export interface CoreProps extends Props {}

export default Loading;

export interface Props extends Styleable, Identifiable, InContainer {
  fullScreen?: boolean;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'inherit';
}
