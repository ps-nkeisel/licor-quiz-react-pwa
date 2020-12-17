import React from 'react';
import '../../styles/components/spinner.scss';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;
