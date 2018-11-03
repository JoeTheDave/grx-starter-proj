import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PrivateRoute from '../architecture/PrivateRoute';
import authService from '../services/authService';
import NavBar from '../components/NavBar';
import AuthPortal from './AuthPortal';
import CustomersList from './CustomersList';
import UsersList from './UsersList';

const styles = {
  appContainer: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
};

const authStatusQuery = gql`
  {
    isAuthenticated @client
  }
`;

class App extends Component {
  componentDidMount() {
    authService.loginExistingToken();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.appContainer}>
        <Router>
          <Query query={authStatusQuery}>
            {({ data: { isAuthenticated } }) => (
              <Fragment>
                <NavBar isAuthenticated={isAuthenticated} />
                <Route exact path="/" component={AuthPortal} />
                <PrivateRoute path="/customers" component={CustomersList} />
                <PrivateRoute path="/users" component={UsersList} />
              </Fragment>
            )}
          </Query>
        </Router>
      </div>
    );
  }
}

export default injectSheet(styles)(App);
