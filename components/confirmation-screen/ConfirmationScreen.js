import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import ButtonNext from '../button/ButtonNext';

import arrowLeft from '../../static/img/arrow-left.svg';
import arrowRight from '../../static/img/arrow-right.svg';
import '../../styles/components/confirmation.scss';

const ConfirmationScreen = ({ text, closeConfirmationScreen, nextPage }) => {
  const first = text.split(',')[0];
  const index = text.indexOf(',');
  const second = text.substr(index + 1);
  return (
    <div className="page bgc-black">
      <div className="confirmation">
        <h2 className="confirmation__text">
          {first},<span>{second}</span>
        </h2>
        <div className="confirmation__btn-wrap">
          <Button
            className="confirmation__btn"
            onClick={() => closeConfirmationScreen(false)}
          >
            <img src={arrowLeft} alt="arrow-left" />
          </Button>
          <ButtonNext href={nextPage} className="confirmation__btn">
            <img src={arrowRight} alt="arrow-right" />
          </ButtonNext>
        </div>
      </div>
    </div>
  );
};

ConfirmationScreen.propTypes = {
  text: PropTypes.string.isRequired,
  closeConfirmationScreen: PropTypes.func.isRequired,
  nextPage: PropTypes.string.isRequired
};

export default ConfirmationScreen;
