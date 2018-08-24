import React from 'react';
import injectSheet from 'react-jss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from '../components/NavBar';
import CustomersContainer from './CustomersContainer';
import AuthContainer from './AuthContainer';

const styles = {
  appContainer: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  }
}

const App = ({ classes }) => (
  <div className={classes.appContainer}>
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={AuthContainer} />
        <Route path="/customers" component={CustomersContainer} />
      </div>
    </Router>
  </div>
);

export default injectSheet(styles)(App);
