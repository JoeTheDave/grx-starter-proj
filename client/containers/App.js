import React from 'react';
import CustomersContainer from './CustomersContainer';
import AuthContainer from './AuthContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
        </ul>

        <hr />

        <Route exact path="/" component={AuthContainer} />
        <Route path="/customers" component={CustomersContainer} />
      </div>
    </Router>
  </div>
);

export default App;
