import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import withFormHelper from '../architecture/withFormHelper';

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    position: 'relative',
    marginBottom: 45,
  },
  input: {
    fontSize: 18,
    padding: [10, 10, 10, 5],
    display: 'block',
    width: 300,
    border: 'none',
    borderBottom: [1, 'solid', '#757575'],

    '&:focus': {
      outline: 'none',
    },

    '&:focus ~ label, &:valid ~ label': {
      top: -20,
      fontSize: 14,
      color: '#5264AE',
    },
  },
  bar: {
    position: 'relative',
    display: 'block',
    width: 300,

    '&:before, &:after': {
      content: '',
      height: 2,
      width: 0,
      bottom: 1,
      position: 'absolute',
      background: '#5264AE',
      transition: '0.2s ease all',
    },

    '&:before': {
      left: '50%',
    },
    '&:after': {
      right: '50%',
    },
  },
  inputLabel: {
    color: '#A9A9A9',
    fontSize: 18,
    fontWeight: 'normal',
  },
  mainButtons: {
    // display: 'flex',
    margin: [10, 0],
  },
  button: {
    color: '#fff',
    margin: '0 30',
    height: 40,
    border: 0,
    cursor: 'pointer',
    fontSize: 18,
    minWidth: 120,
    background: '#28B29A',
    borderRadius: 4,

    '&:hover': {
      background: `#239480`,
    },
  },
};

class Auth extends Component {
  handleRegistrationClick = () => {
    const { email, password } = this.props.formValues;
    this.props.registrationHandler(email, password);
  };

  handleLoginClick = () => {
    const { email, password } = this.props.formValues;
    this.props.loginHandler(email, password);
  };

  render() {
    const { classes, formValues, formSetters } = this.props;
    return (
      <main className={classes.mainContainer}>
        <div className={classes.inputGroup}>
          <span className={classes.inputLabel}>Email:</span>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={formSetters.emailSetter}
            className={classes.input}
          />
          <span className={classes.bar} />
        </div>
        <div className={classes.inputGroup}>
          <span className={classes.inputLabel}>Password:</span>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={formSetters.passwordSetter}
            className={classes.input}
          />
          <span className={classes.bar} />
        </div>
        <div className={classes.mainButtons}>
          <button
            className={classes.button}
            type="button"
            onClick={this.handleRegistrationClick}
          >
            Register
          </button>
          <button
            className={classes.button}
            type="button"
            onClick={this.handleLoginClick}
          >
            Login
          </button>
        </div>
      </main>
    );
  }
}

Auth.propTypes = {
  registrationHandler: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default withFormHelper(['email', 'password'])(injectSheet(styles)(Auth));
