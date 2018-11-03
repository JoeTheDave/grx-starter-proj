import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = {
  usersListFrame: {
    width: 600,
    margin: [200, 'auto', 0, 'auto'],
  },
  usersTable: {
    tableLayout: 'fixed',
    width: '100%',
    border: { style: 'solid', width: 1, color: '#CCC' },
  },
  columnHeader: {
    textAlign: 'left',
  },
};

const UsersList = ({ classes, users }) => (
  <div className={classes.usersListFrame}>
    <table className={classes.usersTable}>
      <tbody>
        <tr className={classes.columnHeader}>
          <th>Email</th>
        </tr>
        {users.map((user) => (
          <tr key={`user-${user.id}`}>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      // TODO: bring graphql fragment into this component and use graphql-anywhere here
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ),
};

UsersList.defaultProps = {
  users: [],
};

export default injectSheet(styles)(UsersList);
