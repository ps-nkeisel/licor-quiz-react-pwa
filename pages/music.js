import React from 'react';
import Wrapper from '../components/wrapper/Wrapper';
import Page from '../components/layout/Page';
import Button from '../components/button/Button';

import '../styles/components/text-block.scss';
import '../styles/components/music.scss';

import spotifyIcon from '../static/img/spotify.png';

const Music = () => {
  return (
    <Page title='Music' headerType='withMenu'>
      <div className='container'>
        <Wrapper className='music-wrap'>
          <div className='text-block' style={{ marginBottom: 30 }}>
            <h2 className='title-big'>
              Let's play
              <span> some good music.</span>
            </h2>
          </div>
          <div>
            <a
              href='https://open.spotify.com/playlist/1IidQTR2HaahdRQ0W4woop?si=7ca-eB4-TKGp6vW0FabDjA'
              className='btn--spotify'
            >
              <img src={spotifyIcon} alt='' />
            </a>
            <div className='text-block' style={{ marginBottom: 30 }}>
              <span className='text-block__text text-block__text--center'>
                Open Spotify for the best Spanish music selection
              </span>
            </div>
          </div>
          <div className='music__submit'>
            <Button component='link' href='/recipe' className='btn'>
              Go Back
            </Button>
          </div>
        </Wrapper>
      </div>
    </Page>
  );
};

export default Music;
