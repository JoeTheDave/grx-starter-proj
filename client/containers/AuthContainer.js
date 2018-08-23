import React from 'react';
import api from '../api';

const registerAccount = () => {
  const email = document.getElementsByName('email')[0].value;
  const password = document.getElementsByName('password')[0].value;
  api.register(email, password);
};

const AuthContainer = () => (
  <div>
    <div>
      <span>Email:</span>
      <input type="text" name="email" />
    </div>
    <div>
      <span>Password:</span>
      <input type="password" name="password" />
    </div>
    <div>
      <button type="button" onClick={registerAccount}>
        Register
      </button>
      <button type="button" onClick={api.login}>
        Login
      </button>
      <button type="button" onClick={api.login}>
        Logout
      </button>
    </div>
  </div>
);

export default AuthContainer;
