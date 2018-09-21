import localStorageService from './localStorageService';
import apolloClientInstance from '../architecture/graph/apolloClientInstance';
import setAuthState from '../architecture/graph/mutations';

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
    .then((json) => {
      const { token, error } = json;
      if (error) {
        console.log(error); // eslint-disable-line no-console
      }
      if (token) {
        localStorageService.setJwtToken(json.token);
        setAuthState(true);
      }
    });
};

const logout = () => {
  localStorageService.setJwtToken();
  setAuthState(false);
  apolloClientInstance.resetStore();
};

export default {
  register: methodFactory('register'),
  login: methodFactory('login'),
  logout,
};
