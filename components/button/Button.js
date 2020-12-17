import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import '../../styles/components/btn.scss';

const Button = ({
  component,
  href,
  className,
  onClick,
  type,
  children,
  ...rest
}) => {
  let buttonClasses = '';
  let linkClasses = '';
  if (component === 'link') {
    linkClasses += className;
  } else {
    buttonClasses += className;
  }
  return (
    <>
      {component === 'link' ? (
        <Link href={href}>
          <a className={linkClasses} onClick={onClick} {...rest}>
            {children}
          </a>
        </Link>
      ) : (
        <button
          type={type}
          className={buttonClasses}
          onClick={onClick}
          {...rest}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  component: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string
};

export default Button;
