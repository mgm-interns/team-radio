import { Avatar, ListItem, ListItemSecondaryAction, ListItemText, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { SongItemProps } from '..';
import { styles } from './styles';

class SimpleSong extends React.Component<CoreProps, CoreStates> {
  public render(): React.ReactNode {
    const { id, classes, song, playing, actions, textClassName } = this.props;
    return (
      <ListItem
        id={id}
        className={classnames(this.props.className, classes.container, { [classes.playing]: playing })}
        dense
      >
        <Avatar src={song.thumbnail} className={classes.thumbnail} />
        <ListItemText
          primary={song.title}
          secondary={song.duration}
          className={classnames(classes.text, textClassName)}
        />
        {actions && <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>}
      </ListItem>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(SimpleSong);

export interface Props extends SongItemProps, Identifiable {
  actions?: React.ReactNode;
  textClassName?: string;
}
