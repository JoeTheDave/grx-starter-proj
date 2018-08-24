import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import withFormHelper from '../architecture/withFormHelper';

const styles = {};

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
      <div>
        <div>
          <span>Email:</span>
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={formSetters.emailSetter}
          />
        </div>
        <div>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={formSetters.passwordSetter}
          />
        </div>
        <div>
          <button type="button" onClick={this.handleRegistrationClick}>
            Register
          </button>
          <button type="button" onClick={this.handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  registrationHandler: PropTypes.func.isRequired,
  loginHandler: PropTypes.func.isRequired,
};

export default withFormHelper(['email', 'password'])(injectSheet(styles)(Auth));
