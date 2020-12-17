import React from 'react';
import Button from '../../components/button/Button';
import Slider from 'react-slick';
import { sliderSettings } from '../../util/slider.settings';

import slide1 from '../../static/img/quiz-home.jpg';
import homeQuizLogo from '../../static/img/home-quiz.svg';

import '../../styles/components/slider.scss';
import '../../styles/components/slider-big.scss';

const SliderQuiz = () => {
  return (
    <div className="slider-wrap">
      <Slider
        {...sliderSettings}
        style={{ touchAction: 'none' }}
        className="slider-quiz"
      >
        <div className="slider__slide">
          <Button component="link" href="/quiz/welcome">
            <div className="slider__slide-img">
              <img src={slide1} alt="" />
              <img src={homeQuizLogo} alt="" className="slider-quiz__logo" />
            </div>
          </Button>
        </div>
        <div className="slider__slide">
          <Button component="link" href="/quiz/welcome">
            <div className="slider__slide-img">
              <img src={slide1} alt="" />
              <img src={homeQuizLogo} alt="" className="slider-quiz__logo" />
            </div>
          </Button>
        </div>
        <div className="slider__slide">
          <Button component="link" href="/quiz/welcome">
            <div className="slider__slide-img">
              <img src={slide1} alt="" />
              <img src={homeQuizLogo} alt="" className="slider-quiz__logo" />
            </div>
          </Button>
        </div>
        <div className="slider__slide">
          <Button component="link" href="/quiz/welcome">
            <div className="slider__slide-img">
              <img src={slide1} alt="" />
              <img src={homeQuizLogo} alt="" className="slider-quiz__logo" />
            </div>
          </Button>
        </div>
        <div className="slider__slide">
          <Button component="link" href="/quiz/welcome">
            <div className="slider__slide-img">
              <img src={slide1} alt="" />
              <img src={homeQuizLogo} alt="" className="slider-quiz__logo" />
            </div>
          </Button>
        </div>
      </Slider>
    </div>
  );
};

export default SliderQuiz;
