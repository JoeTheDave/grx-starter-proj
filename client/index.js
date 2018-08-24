import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { JssProvider } from 'react-jss';

import apolloClientInstance from './architecture/apolloClientInstance';
import jssInstance from './architecture/jssInstance';
import App from './containers/App';

const content = (
  <ApolloProvider client={apolloClientInstance}>
    <JssProvider jss={jssInstance}>
      <App />
    </JssProvider>
  </ApolloProvider>
);

const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);
render(content, root);
