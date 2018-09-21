import database from '../data/database';
import authService from '../services/authService';

module.exports = (server) => {
  server.route({
    method: 'POST',
    path: '/register',
    handler: async (request) => {
      try {
        const { email, password } = request.payload;
        if (!email || !password) {
          return JSON.stringify({ error: 'Invalid registration attempt' });
        }
        const user = await database.createUser(email, password);
        const jwt = authService.mintToken(user);
        return JSON.stringify({ token: jwt });
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return JSON.stringify({
          error: 'An error occured during registration',
        });
      }
    },
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: async (request) => {
      try {
        const { email, password } = request.payload;
        if (!email || !password) {
          return JSON.stringify({ error: 'Invalid login attempt' });
        }
        const user = await database.validateUser(email, password);
        if (!user) {
          return JSON.stringify({ error: 'Invalid login attempt' });
        }
        const jwt = authService.mintToken(user);
        return JSON.stringify({ token: jwt });
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
        return JSON.stringify({ error: 'An error occured during login' });
      }
    },
  });
};
