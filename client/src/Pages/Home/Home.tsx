import {
  Typography,
  withStyles,
  WithStyles,
  TextField,
  Button,
  GridList,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia
} from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import { Station } from 'Models';
import * as React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { styles } from './styles';
import classnames from 'classnames';

export const STATIONS: Station[] = [
  {
    info: {
      name: 'ABC',
      onlineNumber: 1
    }
  },
  {
    info: {
      name: 'A12',
      onlineNumber: 3
    }
  },
  {
    info: {
      name: 'WFM',
      onlineNumber: 0
    }
  },
  {
    info: {
      name: 'mgm shop',
      onlineNumber: 0
    }
  },
  {
    info: {
      name: 'AGCS',
      onlineNumber: 0
    }
  },
  {
    info: {
      name: 'Bank',
      onlineNumber: 0
    }
  }
];

export class CoreHome extends React.Component<Home.CoreProps, Home.States> {
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.backgroundContainer}>
          <picture>
            <img
              className={classes.image}
              sizes="(max-width: 2520px) 100vw, 2520px"
              srcSet="
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_320.jpg 320w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_763.jpg 763w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_1101.jpg 1101w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_1364.jpg 1364w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_1566.jpg 1566w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_1776.jpg 1776w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_1960.jpg 1960w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2119.jpg 2119w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2273.jpg 2273w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2420.jpg 2420w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2490.jpg 2490w,
              /images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2520.jpg 2520w"
              src="/images/90-s-cap-daylight-1350419_dbn83y_c_scale,w_2520.jpg"
              alt=""
            />
          </picture>
        </div>
        <div className={classes.pageInfoContainer}>
          <div className={classes.homeBio}>
            <Typography color={'inherit'} variant={'display4'}>
              Team Radio
            </Typography>
            <Typography color={'inherit'} variant={'display2'}>
              A Radio Station for your team
            </Typography>
          </div>
          <div className={classes.stationCreator}>
            <TextField label={'Your team station'} placeholder={'e.g. Awesome Radio'} margin={'normal'} fullWidth/>
            <Button variant={'contained'} color={'primary'} fullWidth>
              Create
            </Button>
          </div>
        </div>
        {/*<div className={classes.stationsList}>*/}
        {/*{STATIONS.map(({ info }: Station) => {*/}
        {/*return (*/}
        {/*<div key={info.name} className={classes.stationContainer}>*/}
        {/*<img src="/images/station_default_cover.png" alt={info.name} className={classes.stationImg} />*/}
        {/*<div className={classes.onlineNumber}>*/}
        {/*<MdAddCircleOutline />*/}
        {/*<Typography variant={'caption'}>{info.onlineNumber} online</Typography>*/}
        {/*</div>*/}
        {/*<Typography variant={'subheading'}>{info.name}</Typography>*/}
        {/*</div>*/}
        {/*);*/}
        {/*})}*/}
        {/*</div>*/}
      </div>
    );
  }
}

export const Home = withStyles(styles)(CoreHome);

export namespace Home {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
