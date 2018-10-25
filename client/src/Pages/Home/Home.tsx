import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import classnames from 'classnames';
import { Identifiable, Styleable } from 'Common';
import { SimpleStation } from 'Components';
import { FullLayout } from 'Containers';
import { AllStations } from 'RadioGraphql';
import * as React from 'react';
import { Query } from 'react-apollo';
import { MdCreate } from 'react-icons/md';
import { styles } from './styles';

class CoreHome extends React.Component<CoreHome.Props, CoreHome.States> {
  constructor(props: CoreHome.Props) {
    super(props);

    this.state = {
      inputValue: '',
      privateStation: false
    };
  }

  public render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <FullLayout>
        <div className={classes.container}>
          <div className={classes.backgroundContainer}>
            <picture>
              <img
                className={classes.image}
                sizes="(max-width: 2520px) 100vw, 2520px"
                srcSet="
                /images/homepage_BG_d0mq87_c_scale,w_320.jpg 320w,
                /images/homepage_BG_d0mq87_c_scale,w_707.jpg 707w,
                /images/homepage_BG_d0mq87_c_scale,w_986.jpg 986w,
                /images/homepage_BG_d0mq87_c_scale,w_1232.jpg 1232w,
                /images/homepage_BG_d0mq87_c_scale,w_1435.jpg 1435w,
                /images/homepage_BG_d0mq87_c_scale,w_1615.jpg 1615w,
                /images/homepage_BG_d0mq87_c_scale,w_1786.jpg 1786w,
                /images/homepage_BG_d0mq87_c_scale,w_1938.jpg 1938w,
                /images/homepage_BG_d0mq87_c_scale,w_2076.jpg 2076w,
                /images/homepage_BG_d0mq87_c_scale,w_2218.jpg 2218w,
                /images/homepage_BG_d0mq87_c_scale,w_2344.jpg 2344w,
                /images/homepage_BG_d0mq87_c_scale,w_2466.jpg 2466w,
                /images/homepage_BG_d0mq87_c_scale,w_2497.jpg 2497w,
                /images/homepage_BG_d0mq87_c_scale,w_2520.jpg 2520w"
                src="/images/homepage_BG_d0mq87_c_scale,w_2520.jpg"
                alt=""
              />
            </picture>
          </div>
          <div className={classes.pageInfoContainer}>
            <div className={classes.homeBio}>
              <Typography className={classes.logo} color={'inherit'} variant={'display4'}>
                Team Radio
              </Typography>
              <Typography color={'inherit'} variant={'display2'}>
                A Radio Station for your team
              </Typography>
            </div>
            <div className={classes.stationCreator}>
              <FormGroup row>
                <TextField
                  label={'Your team station'}
                  placeholder={'e.g. Awesome Radio'}
                  margin={'normal'}
                  fullWidth
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                  onChange={this.onChange}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.privateStation}
                      onChange={this.onPrivateStationSwitch}
                      color={'primary'}
                    />
                  }
                  label={<Typography color={'primary'}>Private</Typography>}
                />
              </FormGroup>
              <Button
                className={classnames({ disabled: this.state.inputValue === '' })}
                variant={'contained'}
                color={'primary'}
                fullWidth
                disabled={this.state.inputValue === ''}
              >
                <MdCreate /> <span className={classes.createButtonLabel}>Create</span>
              </Button>
            </div>
          </div>
          {this.getAllStations()}
          <div>Something</div>
        </div>
      </FullLayout>
    );
  }

  private onPrivateStationSwitch = (): void => {
    this.setState({ privateStation: !this.state.privateStation });
  };

  private getAllStations = (): React.ReactElement<{}> => {
    const { classes } = this.props;
    return (
      <Query query={AllStations.getAllStationsQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error: ${error.message}`;

          return (
            <div className={classes.stations}>
              {data.allStations.map((station: AllStations.Station) => (
                <SimpleStation key={station.stationId} station={station} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };
}

namespace CoreHome {
  export interface Props extends Home.Props, WithStyles<typeof styles> {}
  export interface States extends Home.States {}
}

export const Home: React.ComponentType<Home.Props> = withStyles(styles)(CoreHome);

export namespace Home {
  export interface Props extends Identifiable, Styleable {}
  export interface States {
    inputValue: string;
    privateStation: boolean;
  }
}
