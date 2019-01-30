import { GradientButton, InternalLink, Picture } from '@Components';
import { FullLayout } from '@Containers';
import { ErrorHelper } from '@Error';
import { useToggle } from '@Hooks';
import { Card, CardActions, CardContent, Fab, FormHelperText, TextField, Typography } from '@material-ui/core';
import { withUnAuthenticated } from '@Modules';
import { LoginMutation } from '@RadioGraphql';
import * as React from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa';
import { RouteComponentProps, withRouter } from 'react-router';
import { useStyles } from './styles';

const LoginPage: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorText, setErrorText] = React.useState<string>('');
  const [loading, loadingAction] = useToggle(false);

  const login = LoginMutation.useMutation();
  const client = useApolloClient();

  const onSubmit = React.useCallback(async () => {
    setErrorText('');
    loadingAction.toggleOn();
    if (!username && !password) return;
    try {
      const variables: LoginMutation.Variables = { password };

      if (username && username.includes('@')) {
        variables.email = username;
      } else {
        variables.username = username;
      }

      const response = await login({ variables });
      loadingAction.toggleOff();
      client.resetStore();
      if (response.data) LoginMutation.saveLoginSession(response.data);
      if (props.history.length > 2) props.history.goBack();
      else props.history.replace('/');
    } catch (errors) {
      const error = ErrorHelper.extractError(errors);
      if (error) {
        setErrorText(error.message);
        loadingAction.toggleOff();
        console.error(error);
      }
    }
  }, [username, password]);

  return (
    <FullLayout>
      <div className={classes.container}>
        <div className={classes.backgroundContainer}>
          <Picture
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
        </div>
        <form className={classes.pageInfoContainer} onSubmit={onSubmit}>
          <Card className={classes.cardContainer}>
            <CardContent>
              <Typography className={classes.cardHeaderTitle} variant={'h5'}>
                Login
              </Typography>
              <Typography className={classes.cardHeaderTitle} variant={'subtitle1'}>
                to start listening and sharing music
              </Typography>
              <CardActions className={classes.loginActions}>
                <Fab className={classes.facebookLoginButton}>
                  <FaFacebookF />
                </Fab>
                <Fab className={classes.googleLoginButton}>
                  <FaGooglePlusG />
                </Fab>
              </CardActions>
              <div className={classes.textFieldsContainer}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Username'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label={'Password'}
                  type={'password'}
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.inputLabel }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <FormHelperText id="error-text" error>
                  {errorText}
                </FormHelperText>
              </div>
              <CardActions className={classes.cardActions}>
                <GradientButton variant={'contained'} fullWidth onClick={onSubmit} disabled={loading} type={'submit'}>
                  Login
                </GradientButton>
                <InternalLink href={'/register'} className={classes.textLink} TypographyProps={{ color: 'primary' }}>
                  Forgot your password
                </InternalLink>
                <InternalLink href={'/register'} className={classes.textLink} TypographyProps={{ color: 'primary' }}>
                  Create an account
                </InternalLink>
              </CardActions>
            </CardContent>
          </Card>
        </form>
      </div>
    </FullLayout>
  );
};

interface CoreProps extends RouteComponentProps, Props {}

export default withUnAuthenticated('/')(withRouter(LoginPage));

export interface Props {}
