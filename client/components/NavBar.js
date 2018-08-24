// External Sources
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import authService from '../services/auth';

const styles = {
  navContainer: {
    height: 80,
    width: '100vw',
    backgroundColor: '#298FC2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  navList: {
    display: 'flex',
    padding: 0,
  },
  navItems: {
    fontSize: 22,
    listStyle: 'none',
    margin: [0, 10],
    
    '& > a': {
      color: '#FFFFFF',
      textDecoration: 'none',
    },
  },
};

const NavBar = ({ classes }) => (
  <nav className={classes.navContainer}>
    <ul className={classes.navList}>
      <li className={classes.navItems}>
        <Link to="/">Auth</Link>
      </li>
      <li className={classes.navItems}>
        <Link to="/customers">Customers</Link>
      </li>
      <li className={classes.navItems}>
        <a href="#" onClick={authService.logout}>
          Logout
        </a>
      </li>
    </ul>
  </nav>
);

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default injectSheet(styles)(NavBar);
