import React from 'react';
import Page from '../components/layout/Page';
import Wrapper from '../components/wrapper/Wrapper';
import Button from '../components/button/Button';

import completeBkg from '../static/img/complete.png';
import '../styles/components/complete.scss';
import '../styles/components/text-block.scss';

const completeBackground = {
  backgroundImage: 'url(' + completeBkg + ')'
};

const Complete = () => {
  return (
    <Page title="Complete" headerType="withMenu">
      <div className="complete complete--opacity" style={completeBackground}>
        <Wrapper className="complete-wrap">
          <div className="text-block">
            <h2 className="title-big mba">
              All is set
              <span>Enjoy!</span>
            </h2>
          </div>
          <div className="complete__btn-wrap">
            <span className="complete__title-text">
              Why not try a fun game?
            </span>
            <Button
              component="link"
              href="/quiz/welcome"
              className="btn btn--sign-up"
            >
              Go to game
            </Button>
            <a href="spotify://&campaign=" className="btn btn--green">
              Listen to Spotify
            </a>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

export default Complete;
