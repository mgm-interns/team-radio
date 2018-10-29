import { Avatar, ListItem, ListItemSecondaryAction, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { SongItem } from '..';
import { styles } from './styles';

class CoreSimpleSong extends React.Component<CoreSimpleSong.Props, CoreSimpleSong.States> {
  constructor(props: CoreSimpleSong.Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { id, classes, song, actions } = this.props;
    return (
      <ListItem id={id} className={classnames(this.props.className, classes.container)} dense>
        <Avatar src={song.thumbnail} className={classes.thumbnail} />
        <ListItemText primary={song.title} secondary={song.duration} className={classes.text} />
        {actions && <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>}
      </ListItem>
    );
  }
}

namespace CoreSimpleSong {
  export interface Props extends SimpleSong.Props, WithStyles<typeof styles> {}
  export interface States {}
}

export const SimpleSong: React.ComponentType<SimpleSong.Props> = withStyles(styles)(CoreSimpleSong);

export namespace SimpleSong {
  export interface Props extends SongItem.Props, Identifiable {
    actions?: React.ReactNode;
  }
}
