import React from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { nextQuestion } from '../../actions/quizActions';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz-ranking.scss';

const QuizRanking = ({ quiz, nextQuestion }) => {
  const { id, ranking, winner } = quiz;
  return (
    <Page title="Quiz - Ranking" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big centered">
              <span>{winner ? 'Final' : 'Current'} Ranking</span>
            </h2>
          </div>
          <div className="quiz-ranking">
            {ranking
              .sort((a, b) => b.points - a.points)
              .map(user => (
                <div className="quiz-ranking__item" key={user.id}>
                  <span className="quiz-ranking__item-text">{user.name}</span>
                  <span className="quiz-ranking__item-points">
                    {user.points}
                  </span>
                </div>
              ))}
          </div>
          {winner ? (
            <div className="btn-wrapper">
              <Button
                component="link"
                href={`/quiz/${id ? 'new-game' : 'join'}`}
                className="btn"
              >
                {id ? 'Start new game' : 'Play again'}
              </Button>
            </div>
          ) : (
            <div className="btn-wrapper">
              <Button
                component="link"
                href={`/quiz/${id ? 'categories' : 'lobby'}`}
                className="btn"
                onClick={() => nextQuestion()}
              >
                Take the next question
              </Button>
            </div>
          )}
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
)(QuizRanking);
