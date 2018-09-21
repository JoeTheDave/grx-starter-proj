import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PrivateRoute from '../architecture/PrivateRoute';
import NavBar from '../components/NavBar';
import CustomersContainer from './CustomersContainer';
import UsersContainer from './UsersContainer';
import AuthPortalContainer from './AuthPortalContainer';

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

const App = ({ classes }) => (
  <div className={classes.appContainer}>
    <Router>
      <Query query={authStatusQuery}>
        {({ data: { isAuthenticated } }) => (
          <Fragment>
            <NavBar isAuthenticated={isAuthenticated} />
            <Route exact path="/" component={AuthPortalContainer} />
            <PrivateRoute path="/customers" component={CustomersContainer} />
            <PrivateRoute path="/uses" component={UsersContainer} />
          </Fragment>
        )}
      </Query>
    </Router>
  </div>
);

export default injectSheet(styles)(App);
