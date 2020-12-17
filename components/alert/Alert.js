import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ msg }) => {
  return (
    <div className="error-wrapper">
      <span className="error-msg">{msg}</span>
    </div>
  );
};

Alert.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Alert;
