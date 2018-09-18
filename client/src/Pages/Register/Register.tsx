import {
  Typography,
  withStyles,
  WithStyles,
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
} from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

export class CoreRegister extends React.Component<Register.CoreProps, Register.States> {
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
                /images/login_BG_m7gib7_c_scale,w_320.jpg 320w,
                /images/login_BG_m7gib7_c_scale,w_760.jpg 760w,
                /images/login_BG_m7gib7_c_scale,w_1065.jpg 1065w,
                /images/login_BG_m7gib7_c_scale,w_1351.jpg 1351w,
                /images/login_BG_m7gib7_c_scale,w_1552.jpg 1552w,
                /images/login_BG_m7gib7_c_scale,w_1740.jpg 1740w,
                /images/login_BG_m7gib7_c_scale,w_1910.jpg 1910w,
                /images/login_BG_m7gib7_c_scale,w_2069.jpg 2069w,
                /images/login_BG_m7gib7_c_scale,w_2207.jpg 2207w,
                /images/login_BG_m7gib7_c_scale,w_2344.jpg 2344w,
                /images/login_BG_m7gib7_c_scale,w_2457.jpg 2457w,
                /images/login_BG_m7gib7_c_scale,w_2514.jpg 2514w,
                /images/login_BG_m7gib7_c_scale,w_2520.jpg 2520w"
              src="/images/login_BG_m7gib7_c_scale,w_2520.jpg"
              alt=""
            />
          </picture>
        </div>
        <div className={classes.pageInfoContainer}>
          <Card className={classes.cardContainer}>
            <CardContent>
              <Typography className={classes.cardHeaderTitle} variant={'headline'}>
                Register
              </Typography>
              <Typography className={classes.cardHeaderTitle} variant={'subheading'}>
                to get the most out of Team Radio
              </Typography>
              <div className={classes.textFieldsContainer}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Username'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Email'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Password'}
                  type={'password'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Confirm Password'}
                  type={'password'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                />
              </div>
              <CardActions className={classes.cardActions}>
                <Button color={'primary'} variant={'contained'} fullWidth>
                  Submit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export const Register = withStyles(styles)(CoreRegister);

export namespace Register {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {}
  export interface States {}
}
