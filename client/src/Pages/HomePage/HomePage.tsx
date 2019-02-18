import { GradientButton, Picture } from '@Components';
import { FullLayout } from '@Containers';
import { useToggle } from '@Hooks';
import { FormControlLabel, FormGroup, Switch, TextField, Typography } from '@material-ui/core';
import { StationItem, StationList } from '@Modules';
import { classnames } from '@Themes';
import * as React from 'react';
import { MdCreate } from 'react-icons/md';
import { useStyles } from './styles';

const HomePage: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [stationName, setStationName] = React.useState<string>('');
  const onStationNameChange = React.useCallback<(event: React.ChangeEvent<HTMLInputElement>) => void>(event => {
    setStationName(event.target.value);
  }, []);

  const [isPrivate, isPrivateAction] = useToggle(false);

  return (
    <FullLayout headerProps={{ position: 'fixed', classes: { appBar: classes.appBar } }}>
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
                onChange={onStationNameChange}
              />
              <FormControlLabel
                control={<Switch checked={isPrivate} onChange={isPrivateAction.toggle} color={'primary'} />}
                label={<Typography color={'primary'}>Private</Typography>}
              />
            </FormGroup>
            <GradientButton
              className={classnames({ disabled: stationName === '' })}
              variant={'contained'}
              fullWidth
              disabled={stationName === ''}
            >
              <MdCreate /> <span className={classes.createButtonLabel}>Create</span>
            </GradientButton>
          </div>
        </div>
        <div className={classes.stations}>
          <StationList StationItem={StationItem.SimpleStation} />
        </div>
      </div>
    </FullLayout>
  );
};
interface CoreProps extends Props {}

export default HomePage;

export interface Props {}
