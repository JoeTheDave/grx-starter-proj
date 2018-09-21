import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router';
import gql from 'graphql-tag';
import authService from '../services/authService';
import AuthPortal from '../components/AuthPortal';

const authStatusQuery = gql`
  {
    isAuthenticated @client
  }
`;

const AuthPortalContainer = () => (
  <Query query={authStatusQuery}>
    {({ data: { isAuthenticated } }) =>
      isAuthenticated ? (
        <Redirect to="/customers" />
      ) : (
        <AuthPortal
          registrationHandler={authService.register}
          loginHandler={authService.login}
        />
      )
    }
  </Query>
);

export default AuthPortalContainer;
