import { ApolloServer } from 'apollo-server-hapi';
import Hapi from 'hapi';
import WebpackPlugin from 'hapi-webpack-plugin';
import inert from 'inert';
import authRoutes from './hapi-routes/authRoutes';
import staticRoutes from './hapi-routes/staticRoutes';
import schema from './graph/schema';
import authService from './services/auth';

const { HOST, PORT } = process.env;

const hapiServer = Hapi.server({
  port: PORT,
  host: HOST,
});

async function start() {
  try {
    await hapiServer.register({
      plugin: WebpackPlugin,
      options: './webpack.config.js',
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  await hapiServer.register(inert); // service of static files

  staticRoutes(hapiServer);
  authRoutes(hapiServer);

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ request }) => {
      const token = (request.headers.authorization || '').replace('JWT ', '');
      const user = authService.verifyToken(token);
      return { user, authenticated: !!user };
    },
  });

  await apolloServer.applyMiddleware({
    app: hapiServer,
    path: '/graph',
  });

  await apolloServer.installSubscriptionHandlers(hapiServer.listener);

  try {
    await hapiServer.start();
  } catch (e) {
    console.log('FAILED TO START SERVER!!!'); // eslint-disable-line no-console
  }
  console.log(`Server listening at ${hapiServer.info.uri}`); // eslint-disable-line no-console

  process.once('SIGUSR2', async () => {
    await apolloServer.stop({ timeout: 60 * 1000 });
    console.log('SERVER STOPPED'); // eslint-disable-line no-console
    process.kill(process.pid, 'SIGUSR2');
  });
}

start();
