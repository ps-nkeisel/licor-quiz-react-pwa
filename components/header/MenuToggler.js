import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/components/menuToggler.scss';

const MenuToggler = ({ isMenuOpen, toggleMenuOpen }) => {
  return (
    <div className="hamburger-wrapper">
      <button
        className={`hamburger hamburger--slider ${
          isMenuOpen ? `is-active` : ''
        }`}
        type="button"
        onClick={() => toggleMenuOpen(prevState => !prevState)}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
    </div>
  );
};

MenuToggler.propTypes = {
  isMenuOpen: PropTypes.bool,
  toggleMenuOpen: PropTypes.func.isRequired
};

export default MenuToggler;
