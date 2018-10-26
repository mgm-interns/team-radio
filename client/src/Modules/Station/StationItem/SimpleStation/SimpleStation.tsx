import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { InternalLink } from 'Components';
import * as React from 'react';
import { StationItem } from '..';
import { styles } from './styles';

class CoreSimpleStation extends React.Component<CoreSimpleStation.Props, CoreSimpleStation.States> {
  constructor(props: CoreSimpleStation.Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { classes, station } = this.props;
    const className = [classes.stationContainer, this.props.className].join(' ').trim();
    return (
      <InternalLink href={`./station/${station.stationId}`} disableTypography>
        <div className={className} id={this.props.id} style={this.props.style}>
          <div className={classes.avatarContainer}>
            <img src="/images/station_default_cover.png" alt="" className={classes.img} />
            <Typography variant={'body1'} className={classes.onlineNumber}>
              0 online
            </Typography>
          </div>
          <Typography variant={'subtitle1'} color={'textPrimary'} className={classes.stationName}>
            {station.stationName}
          </Typography>
        </div>
      </InternalLink>
    );
  }
}

namespace CoreSimpleStation {
  export interface Props extends SimpleStation.Props, WithStyles<typeof styles> {}
  export interface States {}
}

export const SimpleStation: React.ComponentType<SimpleStation.Props> = withStyles(styles)(CoreSimpleStation);

export namespace SimpleStation {
  export interface Props extends StationItem.Props {}
}
