import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_API_CLIENT_ID;
const platformSrc = '//apis.google.com/js/client:platform.js';

const params = {
  client_id: CLIENT_ID,
  cookie_policy: 'single_host_origin',
  // login_hint: loginHint,
  // hosted_domain: hostedDomain,
  fetch_basic_profile: true,
  // discoveryDocs,
  ux_mode: 'popup',
  // redirect_uri: redirectUri,
  scope: 'profile email',
};

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount() {
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
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
        this.setState({
          disabled: false,
        });
      });
    });
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(this.props.onLogoutSuccess);
    }
  }

  render() {
    const {
      tag,
      style,
      className,
      disabledStyle,
      buttonText,
      children,
    } = this.props;
    const disabled = this.state.disabled || this.props.disabled;
    const initialStyle = {
      display: 'inline-block',
      // background: '#d14836',
      // color: '#fff',
      // width: 190,
      // paddingTop: 10,
      // paddingBottom: 10,
      // borderRadius: 2,
      // border: '1px solid transparent',
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
      if (disabled) {
        return Object.assign({}, styleProp, disabledStyle);
      }
      return styleProp;
    })();
    const googleLoginButton = React.createElement(
      tag,
      {
        onClick: this.signOut,
        style: defaultStyle,
        disabled,
        className,
      },
      children || buttonText,
    );
    return googleLoginButton;
  }
}

Logout.propTypes = {
  tag: PropTypes.string,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onLogoutSuccess: PropTypes.func,
};

Logout.defaultProps = {
  tag: 'a',
  // buttonText: 'Logout',
  responseType: 'permission',
  // disabledStyle: {
  //   opacity: 0.6,
  // },
  onRequest: () => {},
};

export default Logout;
