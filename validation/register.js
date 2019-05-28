const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.company = !isEmpty(data.company) ? data.company : '';

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'First name field is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last name field is required';
  }

  if (data.firstname.length < 2 || data.firstname.length > 30) {
    errors.name = 'First name must be between 2 and 30 characters';
  }

  if (data.lastname.length < 2 || data.lastname.length > 30) {
    errors.name = 'Last name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Passwords must match';
    }
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (data.company.length < 2 || data.company.length > 30) {
    errors.company = 'Company must be between 2 and 30 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
