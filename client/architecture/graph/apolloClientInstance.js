import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import localStorageService from '../../services/localStorageService';
import { resolvers, defaults } from './resolvers';

const cache = new InMemoryCache();

const stateLink = withClientState({ resolvers, defaults, cache });

const authLink = setContext((_, { headers }) => {
  const token = localStorageService.getJwtToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: `http://${process.env.HOST}:${process.env.PORT}/graph`,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, authLink, httpLink]),
});

export default client;
