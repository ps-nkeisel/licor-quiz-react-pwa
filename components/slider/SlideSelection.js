import React, { useState } from "react";
import PropTypes from "prop-types";
import { isSafari } from "react-device-detect";

import yesIcon from "../../static/img/yes.png";
import slide1 from "../../static/img/food-1.jpg";
import { BASE_URL } from "../../util/varibales";

const SlideSelection = ({ type, item, selectItem, selected }) => {
  const {
    id,
    name,
    description,
    complexity_number: complexity,
    ingredients_number: ingredients,
    minutes: time,
    image,
    isPerfect
  } = item;
  // Get time digits
  const mins = Math.floor(time / 10);
  const secs = time % 10;
  // Split name in two words
  const firstWord = name.split(" ")[0];
  const theRest = name.substr(name.indexOf(" ") + 1);
  return (
    <div
      className={`slider__slide slider__slide--sm ${
        selected.length &&
        ((type === "foods" && selected[0] && selected[0].id === id) ||
          (type === "drinks" && selected[1] && selected[1].id === id))
          ? "slider__slide--active"
          : ""
      }`}
      onClick={() => {
        selectItem(item);
      }}
    >
      <span className="slider__slide-icon">
        <img src={yesIcon} alt="" />
      </span>
      <div
        className="slider__slide-img"
        style={isSafari ? { height: 140 } : { height: 250 }}
      >
        {isPerfect !== "undefined" && isPerfect && (
          <div
            style={{ position: "absolute", top: 5, right: 20, color: "white" }}
          >
            This is a perfect match
          </div>
        )}
        <img
          src={`${BASE_URL}/storage/${type}/${image}`}
          alt=""
        />
        <span className="slider__slide-img__text">
          {name}
          {/* <span>{theRest}</span> */}
        </span>
      </div>
      <div
        className="slider__slide-text-wrap"
        style={isSafari ? { padding: 0 } : {}}
      >
        <div className="slider__slide-recipe">
          <div className="slider__slide-recipe__text entry-content">
            {description}
          </div>
          <div className="slider__slide-recipe__about">
            <div className="slider__slide-recipe__about-rating">
              <span className="slider__slide-recipe__about-rating-text">
                Complexity
              </span>
              <div className="slider__slide-recipe__about-rating__stars">
                {Array(5)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={`slider__slide-recipe__about-rating__star ${
                          complexity === index + 1 ? "rating__star--active" : ""
                        }`}
                      ></span>
                    );
                  })}
              </div>
            </div>
            <div className="slider__slide-recipe__about-rating">
              <span className="slider__slide-recipe__about-rating-text">
                Ingredients
              </span>
              <div className="slider__slide-recipe__about-rating__stars">
                {Array(5)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={`slider__slide-recipe__about-rating__star ${
                          ingredients === index + 1
                            ? "rating__star--active"
                            : ""
                        }`}
                      ></span>
                    );
                  })}
              </div>
            </div>
            {type === "foods" && time && (
              <div className="slider__slide-recipe__about-time">
                <span className="slider__slide-recipe__about-rating-text">
                  Time
                </span>
                <span className="slider__slide-recipe__about-rating-text slider__slide-recipe__about-rating-text--light">
                  (Minutes)
                </span>
                <div className="slider__slide-recipe__about-time__wrap">
                  <div className="slider__slide-recipe__about-time__item">
                    <span className="slider__slide-recipe__about-time__item-text">
                      {mins}
                    </span>
                  </div>
                  <div className="slider__slide-recipe__about-time__item">
                    <span className="slider__slide-recipe__about-time__item-text">
                      {secs}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SlideSelection.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  selectItem: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired
};

export default SlideSelection;
