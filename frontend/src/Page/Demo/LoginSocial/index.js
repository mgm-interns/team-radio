import React, { Component } from 'react';
import { GoogleLogin } from 'Component';
import Grid from 'material-ui/Grid';

class LoginSocialDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
    };

    this.success = this.success.bind(this);
    this.error = this.error.bind(this);
    this.loading = this.loading.bind(this);
    this.logout = this.logout.bind(this);
  }
  success(response) {
    console.log(response);
    if (response) {
      this.setState({ isSignedIn: true });
    }
  }

  error(response) {
    console.error(response);
  }

  loading() {
    console.log('loading');
  }

  logout() {
    console.log('logout');
    this.setState({ isSignedIn: false });
  }

  render() {
    console.log(this.state.isSignedIn);
    return (
      <Grid container style={{ margin: 0, width: '100%' }}>
        <Grid item xs={12}>
          <h1>Login Social Google Demo</h1>
        </Grid>
        <Grid item xs={12}>
          <GoogleLogin
            onSuccess={this.success}
            onFailure={this.error}
            onRequest={this.loading}
            offline={false}
            responseType="id_token"
            isSignedIn={true}
            disabled={this.state.isSignedIn}
            prompt="consent"
          />
        </Grid>
      </Grid>
    );
  }
}

export default LoginSocialDemo;
