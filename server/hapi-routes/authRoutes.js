import database from '../data/database';
import authService from '../services/auth';

module.exports = (server) => {
  server.route({
    method: 'POST',
    path: '/register',
    handler: async (request) => {
      const { email, password } = request.payload;
      if (!email || !password) {
        throw new Error('Invalid Registration');
      }
      const user = await database.createUser(email, password);
      const jwt = authService.mintToken(user);
      return JSON.stringify({ token: jwt });
    },
  });

  // server.route({
  //   method: 'POST',
  //   path: '/login',
  //   handler: async (request) => {
  //     const { email, password } = request.payload;
  //     if (!email || !password) {
  //       throw new Error('Invalid Registration');
  //     }
  //     const user = await database.createUser(email, password);
  //     const jwt = authService.mintToken(user);
  //     return JSON.stringify({ token: jwt });
  //   },
  // });
};
