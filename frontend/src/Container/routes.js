import Station from 'Page/Station';
import Landing from 'Page/Landing';
import Profile from 'Page/Profile';
import Demo from 'Page/Demo';
import ImageCropper from 'Page/Demo/ImageCropper';
import LoginSocial from 'Page/Demo/LoginSocial';
import Notification from 'Page/Demo/Notification';
import Auth from 'Page/Auth';
import Login from 'Page/Auth/Login';
import Register from 'Page/Auth/Register';
import ForgotPassword from 'Page/Auth/ForgotPassword';
import ResetPassword from 'Page/Auth/ResetPassword';
import Help from 'Page/Help';

export default [
  {
    path: '/',
    component: Landing,
    exact: true,
  },
  {
    path: '/station/:stationId?',
    component: Station,
  },
  {
    path: '/profile/:username?',
    component: Profile,
  },
  {
    path: '/auth/login',
    component: Login,
  },
  {
    path: '/auth/register',
    component: Register,
  },
  {
    path: '/auth/forgotpassword',
    component: ForgotPassword,
  },
  {
    path: '/auth/resetpassword/:token?',
    component: ResetPassword,
  },
  {
    path: '/auth',
    component: Auth,
  },
  {
    path: '/help',
    component: Help,
  },
  {
    path: '/demo/image-cropper',
    component: ImageCropper,
  },
  {
    path: '/demo/login-social',
    component: LoginSocial,
  },
  {
    path: '/demo/notification',
    component: Notification,
  },
  {
    path: '/demo/',
    component: Demo,
  },
];
