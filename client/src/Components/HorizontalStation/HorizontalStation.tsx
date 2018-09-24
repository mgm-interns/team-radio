import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { TextLink } from 'Components';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { styles } from './styles';

class CoreHorizontalStation extends React.Component<CoreHorizontalStation.Props> {
  constructor(props: CoreHorizontalStation.Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { classes, station } = this.props;
    const className = [classes.stationContainer, this.props.className].join(' ').trim();
    return (
      <TextLink linkTo={`./station/${station.stationId}`}>
        <div className={className} id={this.props.id} style={this.props.style}>
          <div className={classes.avatarContainer}>
            <img src="/images/station_default_cover.png" alt="" className={classes.img} />
          </div>
          <div className={classes.stationInfo}>
            <Typography variant={'subheading'} color={'default'} className={classes.stationName}>
              {station.stationName}
            </Typography>
            <Typography variant={'body2'} className={classes.onlineNumber}>
              0 online
            </Typography>
          </div>
        </div>
      </TextLink>
    );
  }
}

namespace CoreHorizontalStation {
  export interface Props extends HorizontalStation.Props, WithStyles<typeof styles> {}
}

export const HorizontalStation: React.ComponentType<HorizontalStation.Props> = withStyles(styles)(
  CoreHorizontalStation
);

export namespace HorizontalStation {
  export interface Props extends Identifiable, Styleable {
    station: AllStations.Station;
  }
}
