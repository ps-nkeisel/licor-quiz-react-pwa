import React, { useState } from 'react';
import { connect } from 'react-redux';
import Page from '../../components/layout/Page';
import Wrapper from '../../components/wrapper/Wrapper';
import Button from '../../components/button/Button';

//components
import '../../styles/components/text-block.scss';
import '../../styles/components/quiz.scss';
import '../../styles/components/inline-block.scss';
import '../../styles/components/invite-code.scss';
//images
import homeQuizIcon from '../../static/img/home-quiz.svg';

const QuizLobby = ({ quiz }) => {
  return (
    <Page title="Quiz - Invite" headerType="quiz">
      <Wrapper size={0} style={{ justifyContent: 'initial' }}>
        <div className="container">
          <div
            className="text-block-big centered"
            style={{ margin: '10px 0 50px' }}
          >
            <h2 className="title-big" style={{ margin: '40px 0' }}>
              Lobby
            </h2>
            <span
              className="text-block-big__text"
              style={{ margin: '80px auto' }}
            >
              {quiz.lobbyText}
            </span>
          </div>
        </div>
      </Wrapper>
    </Page>
  );
};

const mapStateToProps = state => ({
  quiz: state.quiz
});

export default connect(mapStateToProps)(QuizLobby);
