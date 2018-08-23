import jsonwebtoken from 'jsonwebtoken';
import database from './database';

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/public-data',
    handler: (request) => {
      return JSON.stringify({ data: 'public data' });
    },
  });

  server.route({
    method: 'POST',
    path: '/register',
    handler: async (request) => {
      const { email, password } = request.payload;
      if (!email || !password) {
        throw new Error('Invalid Registration');
      }
      const user = await database.createUser(email, password);
      const jwt = jsonwebtoken.sign(
        {
          user: {
            id: user.id,
            email: user.email,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: parseInt(process.env.JWT_EXPIRATION, 10) },
      );
      return JSON.stringify({ token: jwt });
    },
  });
};
