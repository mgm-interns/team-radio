import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { TextLink } from 'Components';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

export class CoreSimpleStation extends React.Component<SimpleStation.CoreProps, SimpleStation.States> {
  constructor(props: SimpleStation.CoreProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { classes, station } = this.props;
    const className = [classes.stationContainer, this.props.className].join(' ').trim();
    return (
      <Link to={`./station/${station.stationId}`}>
        <div className={className} id={this.props.id} style={this.props.style}>
          <div className={classes.avatarContainer}>
            <img src="/images/station_default_cover.png" alt="" className={classes.img} />
            <Typography variant={'body2'} className={classes.onlineNumber}>
              0 online
            </Typography>
          </div>
          <Typography variant={'subheading'} color={'default'} className={classes.stationName}>
            {station.stationName}
          </Typography>
        </div>
      </Link>
    );
  }
}

export const SimpleStation = withStyles(styles)(CoreSimpleStation);

export namespace SimpleStation {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {
    station: AllStations.Station;
  }
  export interface States {}
}
