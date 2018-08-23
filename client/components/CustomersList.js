import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  customersListFrame: {
    width: 600,
    margin: [200, 'auto', 0, 'auto'],
  },
  customersTable: {
    tableLayout: 'fixed',
    width: '100%',
    border: { style: 'solid', width: 1, color: '#CCC' },
  },
  columnHeader: {
    textAlign: 'left',
  },
};

const CustomersList = ({ classes, customers }) => (
  <div className={classes.customersListFrame}>
    <table className={classes.customersTable}>
      <tbody>
        <tr className={classes.columnHeader}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
        {customers.map((customer) => (
          <tr key={`customer-${customer.id}`}>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

CustomersList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO: bring graphql fragment into this component and use graphql-anywhere here
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
  ),
};

CustomersList.defaultProps = {
  customers: [],
};

export default injectSheet(styles)(CustomersList);
