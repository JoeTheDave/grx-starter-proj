import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UsersList from './UsersList';

const usersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const UsersListContainer = () => (
  <Query query={usersQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      return <UsersList users={data.allUsers} />;
    }}
  </Query>
);

export default UsersListContainer;
