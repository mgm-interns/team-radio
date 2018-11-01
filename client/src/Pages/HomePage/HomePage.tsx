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
import { Picture } from 'Components';
import { FullLayout } from 'Containers';
import { StationItem, StationList } from 'Modules';
import * as React from 'react';
import { MdCreate } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from './styles';

class HomePage extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    inputValue: '',
    privateStation: false
  };

  public render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <FullLayout>
        <div className={classes.container}>
          <div className={classes.backgroundContainer}>
            <Picture
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
          </div>
          <div className={classes.pageInfoContainer}>
            <div className={classes.homeBio}>
              <Typography className={classes.logo} color={'inherit'} variant={'h4'}>
                Team Radio
              </Typography>
              <Typography color={'inherit'} variant={'h2'}>
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
          <div className={classes.stations}>
            <StationList itemComponent={StationItem.SimpleStation} />
          </div>
        </div>
      </FullLayout>
    );
  }

  private onPrivateStationSwitch = (): void => {
    this.setState({ privateStation: !this.state.privateStation });
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setState({ inputValue: value });
  };
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {
  inputValue: string;
  privateStation: boolean;
}

export default withStyles(styles)(HomePage);

export interface Props {}
