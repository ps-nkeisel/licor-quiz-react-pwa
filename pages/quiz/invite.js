import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import ReactCodeInput from 'react-code-input';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { joinQuiz } from '../../actions/quizActions';
import Spinner from '../../components/spinner/Spinner';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz.scss';
import '../../styles/components/inline-block.scss';
import '../../styles/components/invite-code.scss';
//images
import homeQuizIcon from '../../static/img/home-quiz.svg';

const QuizInvite = ({ quiz, joinQuiz }) => {
  const [code, setCode] = useState('');
  const router = useRouter();
  const { username, isLoading } = quiz;
  return (
    <Page title="Quiz - Invite" headerType="none">
      <Wrapper size={0}>
        <div className="container">
          <div className="quiz-logo" style={{ width: '26vh' }}>
            <img src={homeQuizIcon} alt="" />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="container">
              <div
                className="text-block-big centered"
                style={{ margin: '10px 0 50px' }}
              >
                <h2 className="title-big">Welcome</h2>
                <span className="text-block-big__text">
                  You have been invited to the most creative quiz game ever
                </span>
              </div>
              <div className="inline-block centered">
                <span>Plase</span>
                <span>insert game code</span>
              </div>
              <div className="invite-code">
                <ReactCodeInput
                  forceUppercase
                  value={code}
                  onChange={code => setCode(code)}
                />
              </div>
              <div className="btn-wrapper">
                <Button
                  className="btn btn--p16"
                  onClick={() => joinQuiz(username, code, router)}
                >
                  Join the Game
                </Button>
              </div>
            </div>
          </>
        )}
      </Wrapper>
    </Page>
  );
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(
  mapStateToProps,
  { joinQuiz }
)(QuizInvite);
