import { CircularProgress, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, InContainer, Styleable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { styles } from './styles';

export class Loading extends React.Component<CoreProps> {
  public render() {
    const { fullScreen, classes, className, style, id, size, color } = this.props;
    return (
      <div
        className={classnames(classes.container, className, { [classes.fullScreen]: fullScreen })}
        style={style}
        id={id}
      >
        <CircularProgress size={size} color={color} />
      </div>
    );
  }
}

export interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(Loading);

export interface Props extends Styleable, Identifiable, InContainer {
  fullScreen?: boolean;
  size?: number | string;
  color?: 'primary' | 'secondary' | 'inherit';
}
