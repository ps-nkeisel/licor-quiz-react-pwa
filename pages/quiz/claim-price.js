import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import request from '../../util/fetch';
import { BASE_URL } from '../../util/varibales';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import ConfirmationScreen from '../../components/confirmation-screen/ConfirmationScreen';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz-vote.scss';
import '../../styles/components/round-block.scss';

import qrCodeImg from '../../static/img/qr-code.png';

const QuizWinner = ({ winner }) => {
  const [showConfirmationScreen, setConfirmationScreen] = useState(false);
  const closeConfirmationScreen = () => setConfirmationScreen(false);
  const [qrCode, setQrCode] = useState(null);
  useEffect(() => {
    (async function getQR() {
      const data = await request(`${BASE_URL}/api/quiz/winner`, 'POST', {
        player_id: winner ? winner.id : null
      });
      console.log('data', data);
      setQrCode(data.qr_image);
    })();
  }, []);
  return (
    <Page title='Quiz - Winner' headerType='quiz'>
      <div className='container'>
        <Wrapper size={140}>
          <div className='text-block' style={{ margin: 0 }}>
            <h2 className='text-block__text' style={{ fontWeight: 'normal' }}>
              Use the code below to claim your <span>20% discount</span> in your
              next purchase of <span>Licor43</span>
            </h2>
          </div>
          <div
            className='qr-code-wrapper'
            style={{ width: 232, margin: '0 auto' }}
          >
            <img src={qrCode || qrCodeImg} alt='qr' />
          </div>
          <div className='btn-wrapper'>
            <Button component='link' href='/quiz/question' className='btn'>
              Share your price
            </Button>
            <Button
              className='btn btn--invert btn--p16'
              onClick={() => setConfirmationScreen(true)}
            >
              Send it to your email
            </Button>
          </div>
        </Wrapper>
      </div>
      {showConfirmationScreen && (
        <ConfirmationScreen
          text='Sure thing,your code will be sent to your email'
          closeConfirmationScreen={closeConfirmationScreen}
          nextPage='/quiz/ranking'
        />
      )}
    </Page>
  );
};

const mapStateToProps = state => ({
  winner: state.quiz.winner
});

export default connect(mapStateToProps)(QuizWinner);
