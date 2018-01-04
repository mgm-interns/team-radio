import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styles from '../styles/facebook.scss';
import getParamsFromObject from 'Util/objectToParams';

const CLIENT_ID = process.env.REACT_APP_FACEBOOK_API_CLIENT_ID;

const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match('CriOS') ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // continue regardless of error
  }

  return isMobile;
};

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

class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSdkLoaded: false,
      isProcessing: false,
    };
  }

  componentDidMount() {
    // this._isMounted = true;
    if (document.getElementById('facebook-jssdk')) {
      this.sdkLoaded();
      return;
    }
    this.setFbAsyncInit();
    this.loadSdkAsynchronously();
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isSdkLoaded && nextProps.autoLoad && !this.props.autoLoad) {
      window.FB.getLoginStatus(this.checkLoginAfterRefresh);
    }
  }

  setFbAsyncInit() {
    const { appId, xfbml, cookie, version, autoLoad } = this.props;
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId: CLIENT_ID,
        xfbml,
        cookie,
      });
      this.setState({ isSdkLoaded: true });
      if (autoLoad || window.location.search.includes('facebookdirect')) {
        window.FB.getLoginStatus(this.checkLoginAfterRefresh);
      }
    };
  }

  sdkLoaded() {
    this.setState({ isSdkLoaded: true });
  }

  loadSdkAsynchronously() {
    const { language } = this.props;
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  responseApi = authResponse => {
    window.FB.api(
      '/me',
      { locale: this.props.language, fields: this.props.fields },
      me => {
        Object.assign(me, authResponse);

        // handle data response
        const res = {};
        res.authResponse = {
          accessToken: me.accessToken,
          userID: me.userID,
          signedRequest: me.signedRequest,
        };
        res.profileObj = {
          facebookId: me.id,
          imageUrl: me.picture.data.url,
          email: me.email,
          name: me.name,
        };

        this.props.onSuccess(res);
      },
    );
  };

  checkLoginState = response => {
    this.setState({ isProcessing: false });
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else if (this.props.onFailure) {
      this.props.onFailure({ status: response.status });
    } else {
      this.props.onSuccess({ status: response.status });
    }
  };

  checkLoginAfterRefresh = response => {
    if (response.status === 'connected') {
      this.checkLoginState(response);
    } else {
      window.FB.login(
        loginResponse => this.checkLoginState(loginResponse),
        true,
      );
    }
  };

  click = e => {
    if (
      !this.state.isSdkLoaded ||
      this.state.isProcessing ||
      this.props.isDisabled
    ) {
      return;
    }
    this.setState({ isProcessing: true });
    const {
      scope,
      // appId,
      onClick,
      reAuthenticate,
      returnScopes,
      redirectUri,
      disableMobileRedirect,
    } = this.props;

    if (typeof onClick === 'function') {
      onClick(e);
      if (e.defaultPrevented) {
        return;
      }
    }

    const params = {
      client_id: CLIENT_ID,
      redirect_uri: redirectUri,
      state: 'facebookdirect',
      return_scopes: returnScopes,
      scope,
    };

    if (reAuthenticate) {
      params.auth_type = 'reauthenticate';
    }

    if (this.props.isMobile && !disableMobileRedirect) {
      window.location.href = `//www.facebook.com/dialog/oauth${getParamsFromObject(
        params,
      )}`;
    } else {
      window.FB.login(this.checkLoginState, {
        scope,
        return_scopes: returnScopes,
        auth_type: params.auth_type,
      });
    }
  };

  style() {
    // const defaultCSS = this.constructor.defaultProps.cssClass;
    // if (this.props.cssClass === defaultCSS) {
    //   return <style dangerouslySetInnerHTML={{ __html: styles }} />;
    // }
    return false;
  }

  containerStyle() {
    const style = {
      transition: 'opacity 0.5s',
    };
    if (
      this.state.isProcessing ||
      !this.state.isSdkLoaded ||
      this.props.isDisabled
    ) {
      style.opacity = 0.6;
    }
    return Object.assign(style, this.props.containerStyle);
  }

  renderOwnButton() {
    const { cssClass, size, icon, buttonText, typeButton, style } = this.props;
    const isIconString = typeof icon === 'string';
    const optionalProps = {};
    if (this.props.isDisabled && _shouldAddDisabledProp(this.props.tag)) {
      optionalProps.disabled = true;
    }

    const initialStyle = {
      display: 'inline-block',
      background: '#3b5998',
      color: '#fff',
      width: '100%',
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
    };

    return (
      <span style={this.containerStyle()}>
        {isIconString && (
          <link
            rel="stylesheet"
            href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
          />
        )}
        <this.props.tag
          type={typeButton}
          className={`${cssClass} ${size}`}
          style={initialStyle}
          onClick={this.click}
          {...optionalProps}
        >
          {icon && isIconString && <i className={`fa ${icon}`} />}
          {icon && !isIconString && icon}
          {buttonText}
        </this.props.tag>
        {this.style()}
      </span>
    );
  }

  render() {
    const { children } = this.props;
    return children ? (
      <span onClick={this.click}>{children}</span>
    ) : (
      this.renderOwnButton()
    );
  }
}

FacebookLogin.propTypes = {
  isDisabled: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired,
  // appId: PropTypes.string.isRequired,
  xfbml: PropTypes.bool,
  cookie: PropTypes.bool,
  reAuthenticate: PropTypes.bool,
  scope: PropTypes.string,
  returnScopes: PropTypes.bool,
  redirectUri: PropTypes.string,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  typeButton: PropTypes.string,
  autoLoad: PropTypes.bool,
  disableMobileRedirect: PropTypes.bool,
  isMobile: PropTypes.bool,
  size: PropTypes.string,
  fields: PropTypes.string,
  cssClass: PropTypes.string,
  version: PropTypes.string,
  icon: PropTypes.any,
  language: PropTypes.string,
  onClick: PropTypes.func,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  children: PropTypes.node,
  tag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onFailure: PropTypes.func,
};

FacebookLogin.defaultProps = {
  buttonText: 'Login with Facebook',
  typeButton: 'button',
  redirectUri: typeof window !== 'undefined' ? window.location.href : '/',
  scope: 'public_profile,email',
  returnScopes: false,
  xfbml: false,
  cookie: false,
  reAuthenticate: false,
  size: 'metro',
  fields: 'name',
  cssClass: 'kep-login-facebook',
  version: '2.11',
  language: 'en_US',
  disableMobileRedirect: false,
  isMobile: getIsMobile(),
  tag: 'button',
  onFailure: null,
};

export default FacebookLogin;
