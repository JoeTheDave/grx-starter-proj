import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UsersList from '../components/UsersList';

const usersQuery = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const UsersContainer = () => (
  <Query query={usersQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      return <UsersList users={data.users} />;
    }}
  </Query>
);

export default UsersContainer;
