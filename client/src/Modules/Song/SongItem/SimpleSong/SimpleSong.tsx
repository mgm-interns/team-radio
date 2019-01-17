import { Avatar, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Identifiable } from 'Common';
import * as React from 'react';
import { classnames } from 'Themes';
import { SongItemProps } from '..';
import { useStyles } from './styles';

const SimpleSong: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id, song, playing, actions, textClassName } = props;
  return (
    <ListItem id={id} className={classnames(props.className, classes.container, { [classes.playing]: playing })} dense>
      <Avatar src={song.thumbnail} className={classes.thumbnail} />
      <ListItemText
        primary={song.title}
        secondary={song.duration}
        className={classnames(classes.text, textClassName)}
      />
      {actions && <ListItemSecondaryAction>{actions}</ListItemSecondaryAction>}
    </ListItem>
  );
};

interface CoreProps extends Props {}

export default SimpleSong;

export interface Props extends SongItemProps, Identifiable {
  actions?: React.ReactNode;
  textClassName?: string;
}
