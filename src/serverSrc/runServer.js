import { ApolloServer } from 'apollo-server-hapi';
import Hapi from 'hapi';
import fs from 'fs';
import jsonwebtoken from 'jsonwebtoken';
import authRoutes from './authRoutes';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync('src/serverSrc/typedefs.graphql', 'utf8');
const { HOST, PORT } = process.env;

// TODO: Do we need async/await here?
async function StartServer() {
  const app = Hapi.server({
    port: PORT,
    host: HOST,
    routes: { cors: true },
  });

  authRoutes(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ request }) => {
      const token = (request.headers.authorization || '').replace('JWT ', '');
      try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        return { user: decoded.user, authenticated: true };
      } catch (e) {
        return { user: null, authenticated: false };
      }
    },
  });

  await server.applyMiddleware({
    app,
    path: '/graph',
  });

  await server.installSubscriptionHandlers(app.listener);

  try {
    await app.start();
  } catch (e) {
    app.log(['start', 'server'], `FATAL: server.start() failed!`); // TODO: Are these logging properly
  }

  app.log(['start', 'server'], `Server listening at ${app.info.uri}`); // TODO: Are these logging properly

  process.once('SIGUSR2', async () => {
    await server.stop({ timeout: 60 * 1000 });
    app.log(['server', 'SIGUSR2'], 'Server stopped.');
    process.kill(process.pid, 'SIGUSR2');
  });
}

StartServer();
