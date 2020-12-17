import React from 'react';
import Button from '../button/Button';
import Menu from './Menu';

import '../../styles/components/header.scss';
import headerBkgSmall from '../../static/img/header-dots-small.png';
import quizLogo from '../../static/img/home-quiz.svg';

const headerBackground = {
  backgroundImage: 'url(' + headerBkgSmall + ')',
  backgroundSize: 'cover'
};

const HeaderQuiz = () => {
  return (
    <div className="header-small mb-80" style={headerBackground}>
      <Button component="link" href="/quiz/rules" className="quiz-logo-wrap">
        <img src={quizLogo} alt="logo" className="quiz-logo" />
      </Button>
      <Menu type="quiz" />
    </div>
  );
};

export default HeaderQuiz;
