import localCache from './localCache';

const baseUrl = 'http://localhost:8000';

export default {
  getPublicData: () => {
    fetch(`${baseUrl}/public-data`, {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((json) => console.log(json.data));
  },
  getPrivateData: () => {
    fetch(`${baseUrl}/private-data`, {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  },
  register: (email, password) => {
    fetch(`${baseUrl}/register`, {
      mode: 'cors',
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
      .then((json) => localCache.set('auth-jwt', json.token));
  },
  login: () => {
    fetch(`${baseUrl}/login`, {
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email: 'test@gmail.com', password: 'password' }),
    }).then((res) => {
      console.log(res.body);
    });
  },
};
