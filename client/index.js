import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { JssProvider } from 'react-jss';
import localCache from './localCache';

import App from './containers/App';
import jssInstance from './jssInstance';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graph', // Make dynamic from .env
});

const authLink = setContext((_, { headers }) => {
  const token = localCache.get('auth-jwt');
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

const root = document.createElement('div');
root.setAttribute('id', 'root');

const content = (
  <ApolloProvider client={client}>
    <JssProvider jss={jssInstance}>
      <App />
    </JssProvider>
  </ApolloProvider>
);

document.body.appendChild(root);
render(content, root);
