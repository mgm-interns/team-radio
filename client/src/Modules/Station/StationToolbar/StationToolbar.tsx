import { Badge, IconButton, Tooltip, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { MdShare as ShareIcon, MdVolumeMute as MuteIcon, MdVolumeUp as UnMuteIcon } from 'react-icons/md';
import { TiUser as UserIcon } from 'react-icons/ti';
import { StationController } from '../StationController';
import { styles } from './styles';

class StationToolbar extends React.Component<CoreProps> {
  public render() {
    const { classes } = this.props;
    return (
      <StationController.Consumer>
        {({ mute, onlineCount, setState }) => (
          <>
            <IconButton color={'inherit'} onClick={() => setState({ mute: !mute })}>
              <Tooltip title={'Mute/Unmute'}>{mute ? <MuteIcon /> : <UnMuteIcon />}</Tooltip>
            </IconButton>
            <IconButton color={'inherit'}>
              <Tooltip title={'Share'}>
                <ShareIcon />
              </Tooltip>
            </IconButton>
            <IconButton color={'inherit'} className={classes.onlineIcon}>
              <Tooltip title={`${onlineCount} online users`}>
                <Badge badgeContent={onlineCount} color="primary" classes={{ badge: classes.onlineBadge }}>
                  <UserIcon />
                </Badge>
              </Tooltip>
            </IconButton>
          </>
        )}
      </StationController.Consumer>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(StationToolbar);

export interface Props {}
