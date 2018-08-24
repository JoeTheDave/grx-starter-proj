import localStorageService from './localStorage';

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}`;

export default {
  register: (email, password) => {
    fetch(`${baseUrl}/register`, {
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
  },
  login: (email, password) => {
    fetch(`${baseUrl}/login`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: email || null,
        password: password || null,
      }),
    }).then((res) => {
      console.log(res.body);
    });
  },
};
