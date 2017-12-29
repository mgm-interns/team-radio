import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'Component/GoogleForm';

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
      <div>
        <GoogleLogin
          onSuccess={this.success}
          onFailure={this.error}
          onRequest={this.loading}
          offline={false}
          responseType="id_token"
          isSignedIn
          disabled={this.state.isSignedIn}
          prompt="consent"
        />
        <GoogleLogout
          onLogoutSuccess={this.logout}
          disabled={!this.state.isSignedIn}
        />
      </div>
    );
  }
}

export default LoginSocialDemo;
