import { Badge, IconButton, WithStyles, withStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
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
          <ShareIcon />
        </IconButton>
        <IconButton color={'inherit'} className={classes.onlineIcon}>
          <Badge badgeContent={99} color="primary" classes={{ badge: classes.onlineBadge }}>
            <UserIcon />
          </Badge>
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
