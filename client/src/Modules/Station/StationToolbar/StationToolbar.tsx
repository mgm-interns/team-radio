import { Badge, IconButton, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { MdShare as ShareIcon } from 'react-icons/md';
import { TiUser as UserIcon } from 'react-icons/ti';
import { styles } from './styles';

class CoreStationToolbar extends React.Component<CoreStationToolbar.Props> {
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
          <Tooltip title={'Online users'}>
            <Badge badgeContent={99} color="primary" classes={{ badge: classes.onlineBadge }}>
              <UserIcon />
            </Badge>
          </Tooltip>
        </IconButton>
      </React.Fragment>
    );
  }
}

namespace CoreStationToolbar {
  export interface Props extends StationToolbar.Props, WithStyles<typeof styles> {}
}

export const StationToolbar = withStyles(styles)(CoreStationToolbar);

export namespace StationToolbar {
  export interface Props {}
}
