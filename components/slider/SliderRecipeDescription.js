import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { isSafari } from "react-device-detect";

import "../../styles/components/slider-big.scss";
import "../../styles/components/slider.scss";

import playButtonIcon from "../../static/img/play-solid.svg";
import pauseButtonIcon from "../../static/img/pause-solid.svg";
import spotifyIcon from "../../static/img/spotify.png";
import reloadIcon from "../../static/img/reload-button.svg";
import { BASE_URL } from "../../util/varibales";

const SliderRecipeDescription = ({
  step,
  type,
  slideIndex,
  currentSlide,
  alexaMode,
  lang
}) => {
  const [playing, setPlaying] = useState(false);
  const {
    image,
    video,
    description,
    description_spanish,
    description_german
  } = step;
  useEffect(() => {
    if (alexaMode && currentSlide === slideIndex) setPlaying(true);
  }, [currentSlide]);
  let desc;
  if (lang === "english") desc = description;
  if (lang === "spanish") desc = description_spanish;
  if (lang === "german") desc = description_german;
  return (
    <React.Fragment>
      <div className="slider__slide">
        {type === "video" ? (
          <div className="slider__slide-video">
            <ReactPlayer
              url={`${BASE_URL}/storage/${video}`}
              onError={error => console.log("video error", error)}
              playing
              muted
              controls={isSafari}
              playsinline
              loop
              height={250}
              width="auto"
            />
          </div>
        ) : (
          <div className="slider__slide-img">
            <img
              src={`${BASE_URL}/storage/${type}-steps/${image}`}
              alt=""
            />
          </div>
        )}
        <div className="slider__slide-text-wrap">
          <span className="slider__slide-text">{desc}</span>
          {alexaMode ? (
            <img
              src={reloadIcon}
              alt="Reload"
              className="slider--big__spotify"
              onClick={() => setPlaying(true)}
            />
          ) : (
            <>
              <a
                href="https://open.spotify.com/playlist/1IidQTR2HaahdRQ0W4woop?si=7ca-eB4-TKGp6vW0FabDjA"
                className="slider--big__spotify"
              >
                <img src={spotifyIcon} alt="" />
              </a>
              {playing ? (
                <img
                  src={pauseButtonIcon}
                  alt="pause-button"
                  className="slider__slide-audio"
                  onClick={() => setPlaying(false)}
                />
              ) : (
                <img
                  src={playButtonIcon}
                  alt="play-button"
                  className="slider__slide-audio"
                  onClick={() => setPlaying(true)}
                />
              )}
            </>
          )}
          {/* Audio description */}
          <ReactPlayer
            url={`${BASE_URL}/api/alexa/${lang}?text=${desc}`}
            config={{
              file: {
                forceAudio: true
              }
            }}
            onError={error => console.log("audio error", error)}
            playing={playing}
            width={0}
            height={0}
            onEnded={() => setPlaying(false)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  alexaMode: state.recipe.alexaMode,
  lang: state.language.currentLanguage
});

export default connect(mapStateToProps)(SliderRecipeDescription);
