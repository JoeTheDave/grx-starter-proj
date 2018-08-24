import React from 'react';
import CustomersContainer from './CustomersContainer';
import AuthContainer from './AuthContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import authService from '../services/auth';

const App = () => (
  <div>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Auth</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <a href="#" onClick={authService.logout}>
              Logout
            </a>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={AuthContainer} />
        <Route path="/customers" component={CustomersContainer} />
      </div>
    </Router>
  </div>
);

export default App;
