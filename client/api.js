import localCache from './localCache';

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
      .then((json) => localCache.set('auth-jwt', json.token));
  },
  login: () => {
    fetch(`${baseUrl}/login`, {
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
