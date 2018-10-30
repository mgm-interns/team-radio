import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { InternalLink } from 'Components';
import * as React from 'react';
import { classnames } from 'Themes';
import { StationItemProps } from '..';
import { styles } from './styles';

class VerticalStation extends React.Component<CoreProps> {
  constructor(props: CoreProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const { classes, station, onClick, id, style, className } = this.props;
    return (
      <InternalLink href={`/station/${station.stationId}`} disableTypography>
        <div className={classnames(classes.stationContainer, className)} id={id} style={style} onClick={onClick}>
          <div className={classes.avatarContainer}>
            <img
              src={station.thumbnail || '/images/station_default_cover.png'}
              alt={station.stationName}
              className={classes.img}
            />
          </div>
          <div className={classes.stationInfo}>
            <Typography variant={'subtitle1'} color={'default'} className={classes.stationName}>
              {station.stationName}
            </Typography>
            <Typography variant={'body1'} className={classes.onlineNumber}>
              {station.onlineCount || 0} online
            </Typography>
          </div>
        </div>
      </InternalLink>
    );
  }
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(VerticalStation);

export interface Props extends StationItemProps {}
