import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;
const platformSrc = '//apis.google.com/js/client:platform.js';

// https://www.w3.org/TR/html5/disabled-elements.html#disabled-elements
const _shouldAddDisabledProp = tag =>
  [
    'button',
    'input',
    'select',
    'textarea',
    'optgroup',
    'option',
    'fieldset',
  ].indexOf(`${tag}`.toLowerCase()) >= 0;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
    this.signIn = this.signIn.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }
  componentDidMount() {
    const {
      cookiePolicy,
      loginHint,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      discoveryDocs,
      onFailure,
      uxMode,
      scope,
      responseType,
    } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = platformSrc;
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: CLIENT_ID,
        cookie_policy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
      };

      if (responseType === 'code') {
        params.access_type = 'offline';
      }

      window.gapi.load('auth2', () => {
        this.enableButton();
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2
            .init(params)
            .then
            // res => {
            //   if (isSignedIn && res.isSignedIn.get()) {
            //     console.log(res.isSignedIn.get());
            //     this._handleSigninSuccess(res.currentUser.get());
            //   }
            // },
            // err => onFailure(err),
            ();
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
  }
  componentWillUnmount() {
    this.enableButton = () => {};
  }

  enableButton() {
    this.setState({
      isDisabled: false,
    });
  }

  signIn(e) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.isDisabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const {
        onSuccess,
        onRequest,
        onFailure,
        prompt,
        responseType,
      } = this.props;
      const options = {
        prompt,
      };
      onRequest();
      if (responseType === 'code') {
        auth2
          .grantOfflineAccess(options)
          .then(res => onSuccess(res), err => onFailure(err));
      } else {
        auth2
          .signIn(options)
          .then(res => this._handleSigninSuccess(res), err => onFailure(err));
      }
    }
  }
  _handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();
    const returnObject = {};
    returnObject.authResponse = {
      googleId: basicProfile.getId(),
      tokenObj: authResponse,
      tokenId: authResponse.id_token,
      accessToken: authResponse.access_token,
    };
    returnObject.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
    };
    console.log(returnObject);
    this.props.onSuccess(returnObject);
  }

  renderOwnButton() {
    const {
      tag,
      type,
      style,
      className,
      disabledStyle,
      buttonText,
      children,
    } = this.props;

    // verify disabled
    const isDisabled = this.state.isDisabled || this.props.isDisabled;
    const optionalProps = {};
    if (isDisabled && _shouldAddDisabledProp(this.props.tag)) {
      optionalProps.disabled = true;
    }

    // init style
    const initialStyle = {
      display: 'inline-block',
      background: '#d14836',
      color: '#fff',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
    };
    const styleProp = (() => {
      if (style) {
        return style;
      } else if (className && !style) {
        return {};
      }
      return initialStyle;
    })();
    const defaultStyle = (() => {
      if (isDisabled) {
        return Object.assign({}, styleProp, disabledStyle);
      }
      return styleProp;
    })();

    return (
      <span>
        <this.props.tag
          type={type}
          className={className}
          style={defaultStyle}
          onClick={this.signIn}
          {...optionalProps}
        >
          {buttonText}
        </this.props.tag>
      </span>
    );
  }

  render() {
    const { children } = this.props;

    return children ? (
      <span onClick={this.signIn}>{children}</span>
    ) : (
      this.renderOwnButton()
    );
  }
}

Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func, // required if we need
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  isDisabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
};

Login.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6,
  },
  onRequest: () => {},
};

export default Login;
