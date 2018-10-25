import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { WrapperLink } from 'Components';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { styles } from './styles';

class CoreVerticalStation extends React.Component<CoreVerticalStation.Props> {
  constructor(props: CoreVerticalStation.Props) {
    super(props);
  }

  public render(): React.ReactNode {
    const { classes, station, onClick: onWrapperClick } = this.props;
    const className = [classes.stationContainer, this.props.className].join(' ').trim();
    return (
      <WrapperLink linkTo={`/station/${station.stationId}`}>
        <div className={className} id={this.props.id} style={this.props.style} onClick={() => onWrapperClick()}>
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
      </WrapperLink>
    );
  }
}

namespace CoreVerticalStation {
  export interface Props extends VerticalStation.Props, WithStyles<typeof styles> {}
}

export const VerticalStation: React.ComponentType<VerticalStation.Props> = withStyles(styles)(CoreVerticalStation);

export namespace VerticalStation {
  export interface Props extends Identifiable, Styleable {
    station: AllStations.Station;
    onClick?(): void;
  }
}
