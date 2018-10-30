import { Badge, IconButton, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { MdShare as ShareIcon } from 'react-icons/md';
import { TiUser as UserIcon } from 'react-icons/ti';
import { styles } from './styles';

class StationToolbar extends React.Component<CoreProps> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <IconButton color={'inherit'}>
          <Tooltip title={'Share'}>
            <ShareIcon />
          </Tooltip>
        </IconButton>
        <IconButton color={'inherit'} className={classes.onlineIcon}>
          <Tooltip title={'99 online users'}>
            <Badge badgeContent={99} color="primary" classes={{ badge: classes.onlineBadge }}>
              <UserIcon />
            </Badge>
          </Tooltip>
        </IconButton>
      </React.Fragment>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(StationToolbar);

export interface Props {}
