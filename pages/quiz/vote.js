import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import Spinner from '../../components/spinner/Spinner';
import { voteForAnswer } from '../../actions/quizActions';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz-vote.scss';

const QuizVote = ({ quiz, voteForAnswer }) => {
  const [vote, setVote] = useState(null);
  const router = useRouter();
  const { question, answers, isLoading } = quiz;
  return (
    <Page title="Quiz - Vote" headerType="quiz">
      <div className="container">
        <Wrapper size={140}>
          <div className="text-block">
            <h2 className="text-block__title title-big">
              Vote for
              <span>your favourite</span>
            </h2>
            <span className="text-block__text">
              {question.description || null}
            </span>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <div className="quiz-vote">
                {answers
                  .filter(item => item.answer !== quiz.answer)
                  .map(({ id, answer }) => (
                    <div
                      className={`quiz-vote__item ${
                        vote === id ? 'active' : ''
                      }`}
                      key={id}
                      onClick={() => setVote(id)}
                    >
                      <span className="quiz-vote__item-text">{answer}</span>
                    </div>
                  ))}
              </div>
              <div className="btn-wrapper">
                <Button
                  className="btn btn--p16"
                  onClick={() => voteForAnswer(vote, router)}
                >
                  Vote
                </Button>
              </div>
            </>
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
  { voteForAnswer }
)(QuizVote);
