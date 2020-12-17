import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import Button from "../button/Button";
import { sliderSettings } from "../../util/slider.settings";
import { BASE_URL } from "../../util/varibales";

import "../../styles/components/slider-big.scss";
import "../../styles/components/slider.scss";

import SliderRecipeDescription from "./SliderRecipeDescription";

const SliderRecipe = ({
  type,
  steps,
  order,
  currentSlide,
  setCurrentSlide
}) => {
  const { selectedFood, selectedDrink } = order;
  return (
    <div className="slider-wrap" style={{ marginBottom: 0 }}>
      <Slider
        {...sliderSettings}
        style={{ touchAction: "none" }}
        className={`slider--big ${
          type === "drink" ? "slider--big--white" : ""
        }`}
        afterChange={index => setCurrentSlide(index)}
      >
        {steps.map((step, i) => {
          if (!step.image) {
            return (
              <SliderRecipeDescription
                key={step.id}
                step={step}
                slideIndex={i}
                currentSlide={currentSlide}
                type="video"
              />
            );
          } else {
            return (
              <SliderRecipeDescription key={step.id} step={step} type="image" />
            );
          }
        })}
        {steps.length !== 0 && (
          <React.Fragment>
            <div className="slider__slide">
              <div className="slider__slide-img">
                {type === "drink" ? (
                  <img
                    src={`${BASE_URL}/storage/${type}s/${selectedDrink.image}`}
                    alt=""
                  />
                ) : (
                  <img
                    src={`${BASE_URL}/storage/${type}s/${selectedFood.image}`}
                    alt=""
                  />
                )}
              </div>
              <div className="slider__slide-text-wrap">
                <div className="btn-wrapper">
                  <Button
                    component="link"
                    href={type === "drink" ? "/recipe/food" : "/recipe/drinks"}
                    className="btn btn--white"
                    style={{ padding: "13px 35px" }}
                  >
                    {type === "drink" ? "Food" : "Drinks"}
                  </Button>
                  <Button component="link" href="/complete" className="btn">
                    Get everything ready
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Slider>
    </div>
  );
};

SliderRecipe.propTypes = {
  type: PropTypes.string,
  steps: PropTypes.array.isRequired,
  order: PropTypes.object
};

export default SliderRecipe;
