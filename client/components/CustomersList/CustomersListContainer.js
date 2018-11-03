import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CustomersList from './CustomersList';

const customersQuery = gql`
  {
    customers {
      id
      firstName
      lastName
      email
    }
  }
`;

const CustomersListContainer = () => (
  <Query query={customersQuery}>
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      return <CustomersList customers={data.customers} />;
    }}
  </Query>
);

export default CustomersListContainer;
