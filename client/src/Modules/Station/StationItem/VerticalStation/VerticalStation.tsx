import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { InternalLink } from 'Components';
import * as React from 'react';
import { classnames } from 'Themes';
import { StationItem } from '..';
import { styles } from './styles';

class CoreVerticalStation extends React.Component<CoreVerticalStation.Props> {
  constructor(props: CoreVerticalStation.Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { classes, station, onClick, id, style, className } = this.props;
    return (
      <InternalLink href={`/station/${station.stationId}`} disableTypography>
        <div className={classnames(classes.stationContainer, className)} id={id} style={style} onClick={onClick}>
          <div className={classes.avatarContainer}>
            <img src="/images/station_default_cover.png" alt="" className={classes.img} />
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

namespace CoreVerticalStation {
  export interface Props extends VerticalStation.Props, WithStyles<typeof styles> {}
}

export const VerticalStation: React.ComponentType<VerticalStation.Props> = withStyles(styles)(CoreVerticalStation);

export namespace VerticalStation {
  export interface Props extends StationItem.Props {}
}
