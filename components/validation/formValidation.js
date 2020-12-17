import { isEmpty } from '../../util/isEmpty';

export const validateRegisterFields = ({
  name,
  email,
  password,
  confirmPassword,
  legit
}) => {
  let errors = {};
  if (
    isEmpty(name) ||
    isEmpty(password) ||
    isEmpty(email) ||
    (!isEmpty(email) && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) ||
    !legit
  ) {
    // name empty
    if (isEmpty(name)) {
      errors.name = 'Name is required.';
    }
    // password empty
    if (isEmpty(password)) {
      errors.password = 'Password is required.';
    }
    if (password !== confirmPassword) {
      errors.password = 'Passwords do not match.';
    }
    if (isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    // email valid
    if (
      !isEmpty(email) &&
      !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      errors.email = 'Invalid email';
    }
    if (!legit) {
      errors.legit = 'You have to be at least 18 years old to register.';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateInputFields = ({ email, password }) => {
  let errors = {};
  if (
    isEmpty(email) ||
    isEmpty(password) ||
    (!isEmpty(email) && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
  ) {
    if (isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    if (
      !isEmpty(email) &&
      !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      errors.email = 'Invalid email';
    }
    if (isEmpty(password)) {
      errors.password = 'Password is required.';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export const validateNewContactFields = ({
  name,
  location,
  email,
  phoneNumber
}) => {
  let errors = {};
  if (
    isEmpty(name) ||
    isEmpty(location) ||
    isEmpty(email) ||
    isEmpty(phoneNumber) ||
    (!isEmpty(email) && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
  ) {
    if (isEmpty(name)) {
      errors.name = 'Name is required.';
    }
    if (isEmpty(location)) {
      errors.location = 'Location is required.';
    }
    if (isEmpty(email) && email !== null) {
      errors.email = 'Email is required.';
    }
    if (
      !isEmpty(email) &&
      !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      errors.email = 'Invalid email';
    }
    if (isEmpty(phoneNumber) && phoneNumber !== null) {
      errors.number = 'Number is required.';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
