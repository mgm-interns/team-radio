import { CircularProgress, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, InContainer, Styleable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { styles } from './styles';

export class CoreLoading extends React.Component<CoreLoading.Props> {
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

export namespace CoreLoading {
  export interface Props extends WithStyles<typeof styles>, Loading.Props {}
}

export const Loading = withStyles(styles)(CoreLoading);

export namespace Loading {
  export interface Props extends Styleable, Identifiable, InContainer {
    fullScreen?: boolean;
    size?: number | string;
    color?: 'primary' | 'secondary' | 'inherit';
  }
}
