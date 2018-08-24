import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import localStorageService from '../services/localStorage';

const httpLink = createHttpLink({
  uri: `http://${process.env.HOST}:${process.env.PORT}/graph`,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorageService.get('auth-jwt');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
