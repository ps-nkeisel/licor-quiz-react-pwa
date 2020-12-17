import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import ButtonNext from '../button/ButtonNext';

import userIcon from '../../static/img/user.svg';
import arrowLeft from '../../static/img/arrow-left.svg';
import arrowRight from '../../static/img/arrow-right.svg';
import '../../styles/components/confirmation.scss';

const ConfirmationScreenGuests = ({
  text,
  closeConfirmationScreen,
  nextPage
}) => {
  const first = text.split(',')[0];
  const second = text.split(',')[1];
  const guests = Array(6).fill(0);
  return (
    <div className="page bgc-black">
      <div className="confirmation confirmation--guests">
        <div className="container">
          <h2 className="confirmation__text">{first},</h2>
          <div className="confirmation-guests">
            {/* Change to list of contacts that confirmed the invitation */}
            {guests.map((item, i) => (
              <div className="confirmation-guest" key={i}>
                <div className="confirmation-guest__icon">
                  {/* 
                  IF there is no user icon apply .confirmation-guest__icon-default
                  ELSE img shouldn't have classname to fill whole space
                */}
                  <img
                    src={userIcon}
                    alt=""
                    className="confirmation-guest__icon-default"
                  />
                </div>
                <span className="confirmation-guest__name">John Doe</span>
              </div>
            ))}
          </div>
          <h2 className="confirmation__text">
            <span>{second}</span>
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
          <div className="btn-wrapper">
            <Button
              component="link"
              href="/event/guests"
              className="btn btn--inverse"
            >
              Guest List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationScreenGuests.propTypes = {
  text: PropTypes.string.isRequired,
  closeConfirmationScreen: PropTypes.func.isRequired,
  nextPage: PropTypes.string.isRequired
};

export default ConfirmationScreenGuests;
