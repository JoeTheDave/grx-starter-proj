import React from 'react';
import authService from '../services/auth';
import Auth from '../components/Auth';

const AuthContainer = () => (
  <Auth
    registrationHandler={authService.register}
    loginHandler={authService.login}
  />
);

export default AuthContainer;
