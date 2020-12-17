import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import '../../styles/components/btn.scss';

const ButtonNext = ({ href, className, onClick, type, children }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </button>
  );
};

ButtonNext.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default ButtonNext;
