import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  Icon,
  TextField,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { ApolloClient } from 'apollo-boost';
import { InternalLink } from 'Components';
import { FullLayout } from 'Containers';
import { ErrorHelper } from 'Error';
import { LoginMutation } from 'RadioGraphql';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { RouteComponentProps, withRouter } from 'react-router';
import { styles } from './styles';

class CoreLogin extends React.Component<CoreLogin.Props, CoreLogin.States> {
  constructor(props: CoreLogin.Props) {
    super(props);

    this.state = { username: '', password: '', errorText: '', loading: false };
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
          <ApolloConsumer>
            {client => (
              <form className={classes.pageInfoContainer} onSubmit={() => this.onSubmit(client)}>
                <Card className={classes.cardContainer}>
                  <CardContent>
                    <Typography className={classes.cardHeaderTitle} variant={'h5'}>
                      Login
                    </Typography>
                    <Typography className={classes.cardHeaderTitle} variant={'subtitle1'}>
                      to start listening and sharing music
                    </Typography>
                    <CardActions className={classes.loginActions}>
                      <Button variant={'fab'} className={classes.facebookLoginButton}>
                        <Icon>
                          <FaFacebookF />
                        </Icon>
                      </Button>
                      <Button variant={'fab'} className={classes.googleLoginButton}>
                        <Icon>
                          <FaGooglePlusG />
                        </Icon>
                      </Button>
                    </CardActions>
                    <div className={classes.textFieldsContainer}>
                      <TextField
                        className={classes.textField}
                        fullWidth
                        label={'Username'}
                        InputProps={{ className: classes.input }}
                        InputLabelProps={{ className: classes.inputLabel }}
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                      />
                      <TextField
                        className={classes.textField}
                        fullWidth
                        label={'Password'}
                        type={'password'}
                        InputProps={{ className: classes.input }}
                        InputLabelProps={{ className: classes.inputLabel }}
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                      <FormHelperText id="error-text" error>
                        {this.state.errorText}
                      </FormHelperText>
                    </div>
                    <CardActions className={classes.cardActions}>
                      <Button
                        color={'primary'}
                        variant={'contained'}
                        fullWidth
                        onClick={() => this.onSubmit(client)}
                        disabled={this.state.loading}
                        type={'submit'}
                      >
                        Login
                      </Button>
                      <InternalLink href={'/'} color={'primary'} className={classes.textLink}>
                        Forgot your password
                      </InternalLink>
                      <InternalLink
                        href={'/'}
                        color={'primary'}
                        children={'Create an account'}
                        className={classes.textLink}
                      />
                    </CardActions>
                  </CardContent>
                </Card>
              </form>
            )}
          </ApolloConsumer>
        </div>
      </FullLayout>
    );
  }

  private onSubmit = async (client: ApolloClient<any>) => {
    this.setState({ errorText: '', loading: true });
    if (!this.state.username && !this.state.password) {
      return;
    }
    try {
      await this.props.mutate({ variables: this.state });
      this.setState({ loading: false });
      client.resetStore();
      if (this.props.history.length > 2) this.props.history.goBack();
      else this.props.history.replace('/');
    } catch (errors) {
      const error = ErrorHelper.extractError(errors);
      if (error) {
        this.setState({ errorText: error.message, loading: false });
        console.error(error);
      }
    }
  };
}

namespace CoreLogin {
  export interface Props
    extends LoginMutation.WithHOCProps,
      RouteComponentProps,
      WithStyles<typeof styles>,
      Login.Props {}

  export interface States extends LoginMutation.Variables {
    errorText: string;
    loading: boolean;
  }
}

export const Login: React.ComponentType<Login.Props> = LoginMutation.withHOC<Login.Props>()(
  withStyles(styles)(withRouter(CoreLogin))
);

export namespace Login {
  export interface Props {}
}
