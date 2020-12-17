import React from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz-vote.scss';
import '../../styles/components/round-block.scss';

import Logo from '../../static/img/licor43.svg';

const QuizWinner = ({ quiz }) => {
  return (
    <Page title="Quiz - Winner" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div
            className="round-block round-block--small"
            style={{ width: 270, height: 270, margin: '60px auto' }}
          >
            <img
              src={Logo}
              alt=""
              className="round-block__logo"
              style={{ right: 30 }}
            />
            <span className="round-block__text">You are the winner</span>
          </div>
          <div className="btn-wrapper">
            <Button component="link" href="/quiz/claim-price" className="btn">
              Collect your price
            </Button>
            <Button
              component="link"
              href="/quiz/new-game"
              className="btn btn--invert"
            >
              Go back to game
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(mapStateToProps)(QuizWinner);
