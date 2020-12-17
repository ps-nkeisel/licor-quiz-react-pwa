import React from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { nextQuestion } from '../../actions/quizActions';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz-vote.scss';
import '../../styles/components/round-block.scss';

import byIcon from '../../static/img/by.png';
import Logo from '../../static/img/licor43.svg';

const RoundWinner = ({ quiz, nextQuestion }) => {
  const { id, username, winnerRound } = quiz;
  return (
    <Page title="Quiz - Winner" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              We have
              <span>a winner</span>
            </h2>
          </div>
          <div className="round-block round-block--small">
            <img
              src={Logo}
              alt=""
              className="round-block__logo"
              style={{ right: 20 }}
            />
            {username === winnerRound.name ? (
              <span className="round-block__text" style={{ fontSize: '4vh' }}>
                You are the winner
              </span>
            ) : (
              <>
                <span className="round-block__text" style={{ fontSize: '4vh' }}>
                  {winnerRound.answer}
                </span>
                <img src={byIcon} alt="" />
                <span className="round-block__text" style={{ fontSize: '4vh' }}>
                  <span>{winnerRound.name}</span>
                </span>
              </>
            )}
          </div>
          <div className="btn-wrapper">
            <Button
              component="link"
              href={`/quiz/${id ? 'categories' : 'lobby'}`}
              className="btn"
              onClick={() => nextQuestion()}
            >
              Take the next question
            </Button>
            <Button
              component="link"
              href="/quiz/ranking"
              className="btn btn--invert"
            >
              Check on Ranking
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

export default connect(
  mapStateToProps,
  { nextQuestion }
)(RoundWinner);
