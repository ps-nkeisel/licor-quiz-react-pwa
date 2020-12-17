import React, { useState } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';
import { setGuestUsername } from '../../actions/quizActions';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz.scss';
import '../../styles/components/inline-block.scss';
import '../../styles/components/forms.scss';
//images
import homeQuizIcon from '../../static/img/home-quiz.svg';

const QuizJoin = ({ setGuestUsername }) => {
  const [name, setName] = useState('');
  return (
    <Page title="Quiz - Join" headerType="none">
      <Wrapper size={0}>
        <div className="container">
          <div className="quiz-logo" style={{ width: '26vh' }}>
            <img src={homeQuizIcon} alt="" />
          </div>
        </div>
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
            <span>insert your name</span>
          </div>
          <div className="join-form">
            <input
              type="text"
              className="input"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>
          <div className="btn-wrapper">
            <Button
              component="link"
              href="/quiz/invite"
              className="btn"
              onClick={() => setGuestUsername(name)}
            >
              Continue
            </Button>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

export default connect(
  null,
  { setGuestUsername }
)(QuizJoin);
