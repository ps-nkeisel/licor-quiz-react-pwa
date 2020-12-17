import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { browserName } from 'react-device-detect';

const Wrapper = ({ size, className, style, children }) => {
  const [windowHeight, setWindowHeight] = useState(560);
  const isSafari = browserName === 'Mobile Safari';
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  return (
    <div
      className={`wrapper ${className ? className : ''}`}
      style={{ ...style, height: `${windowHeight - size}px` }}
    >
      {children}
    </div>
  );
};

Wrapper.defaultProps = {
  size: 60,
  style: {}
};

Wrapper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default Wrapper;
