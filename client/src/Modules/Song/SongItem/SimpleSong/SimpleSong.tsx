import { Identifiable } from '@Common';
import { Avatar, ListItem, ListItemSecondaryAction, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { UserQuery } from '@RadioGraphql';
import { classnames } from '@Themes';
import * as Moment from 'moment';
import * as React from 'react';
import { SongItemProps } from '..';
import { useStyles } from './styles';

const SimpleSong: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();
  const { id, song, playing, actions, textClassName } = props;

  const duration = React.useMemo(() => {
    return Moment.duration(song.duration, 'milliseconds').format('H:m:ss');
  }, [song.duration]);

  const { loading, data } = UserQuery.useQuery({ variables: { id: song.creatorId }, suspend: false });

  const secondary = React.useMemo(() => {
    let avatarUrl: string | undefined;
    let username: string | undefined;
    let alternativeIcon: string | undefined;
    if (data && !loading) {
      avatarUrl = data.item.avatarUrl;
      username = data.item.username;
      alternativeIcon = data.item.username[0].toUpperCase();
    }
    return (
      <Tooltip title={`Added by ${username || 'Unknown'}`} placement={'bottom-start'}>
        <Avatar src={avatarUrl} component={'span'} className={classes.userAvatar}>
          {alternativeIcon}
        </Avatar>
      </Tooltip>
    );
  }, [data, loading]);

  return (
    <ListItem
      id={id}
      className={classnames(props.className, classes.container, { [classes.playing]: playing })}
      classes={{ default: classes.listItem }}
      dense
    >
      <div className={classes.thumbnailContainer}>
        <Avatar src={song.thumbnail} className={classes.thumbnail} />
        <Typography variant={'subtitle2'} className={classes.thumbnailDuration}>
          {duration}
        </Typography>
      </div>
      <ListItemText
        primary={
          <Tooltip title={song.title} placement={'bottom-start'}>
            <span>{song.title}</span>
          </Tooltip>
        }
        secondary={secondary}
        className={classnames(classes.text, textClassName)}
        classes={{ primary: classes.primaryText, secondary: classes.secondaryText }}
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
