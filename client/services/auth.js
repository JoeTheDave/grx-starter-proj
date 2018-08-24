import localStorageService from './localStorage';
import apolloClientInstance from '../architecture/apolloClientInstance';

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;

const methodFactory = (action) => (email, password) => {
  fetch(`${baseUrl}/${action}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email: email || null,
      password: password || null,
    }),
  })
    .then((res) => res.json())
    .then((json) => localStorageService.set('auth-jwt', json.token));
};

const logout = () => {
  localStorageService.set('auth-jwt');
  apolloClientInstance.resetStore();
};

export default {
  register: methodFactory('register'),
  login: methodFactory('login'),
  logout,
};
