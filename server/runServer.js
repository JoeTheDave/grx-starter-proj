import { ApolloServer } from 'apollo-server-hapi';
import Hapi from 'hapi';
import jsonwebtoken from 'jsonwebtoken';
import authRoutes from './authRoutes';
import schema from './schema';

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
    schema,
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
    console.log('FAILED TO START SERVER!!!'); // eslint-disable-line no-console
  }
  console.log(`Server listening at ${app.info.uri}`); // eslint-disable-line no-console

  process.once('SIGUSR2', async () => {
    await server.stop({ timeout: 60 * 1000 });
    console.log('SERVER STOPPED'); // eslint-disable-line no-console

    process.kill(process.pid, 'SIGUSR2');
  });
}

StartServer();
