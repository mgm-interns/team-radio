import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { InternalLink } from 'Components';
import * as React from 'react';
import { classnames } from 'Themes';
import { StationItemProps } from '..';
import { styles } from './styles';

class SimpleStation extends React.Component<CoreProps, CoreStates> {
  public render(): React.ReactNode {
    const { classes, station, id, style, className } = this.props;
    return (
      <InternalLink href={`./station/${station.stationId}`} disableTypography>
        <div id={id} className={classnames(classes.stationContainer, className)} style={style}>
          <div className={classes.avatarContainer}>
            <img
              src={station.thumbnail || '/images/station_default_cover.png'}
              alt={station.stationName}
              className={classes.img}
            />
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

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {}

export default withStyles(styles)(SimpleStation);

export interface Props extends StationItemProps {}
