import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Route, Redirect } from 'react-router';
// import { Route } from 'react-router-dom';
import gql from 'graphql-tag';

const authStatusQuery = gql`
  {
    isAuthenticated @client
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Query query={authStatusQuery}>
    {({ data: { isAuthenticated } }) => (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )}
  </Query>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
