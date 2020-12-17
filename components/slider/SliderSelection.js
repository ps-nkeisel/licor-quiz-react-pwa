import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import { sliderSettings } from '../../util/slider.settings';
import Slide from './SlideSelection';
import '../../styles/components/slider-selection.scss';

const SliderSelection = ({ type, items, setItems, selected }) => {
  return (
    <div className='slider-wrap'>
      <Slider
        {...sliderSettings}
        style={{ touchAction: 'none' }}
        className={`${type === 'drinks' ? 'slider--drinks' : ''}`}
      >
        {items.map((item, i) => (
          <Slide
            key={i}
            type={type}
            item={item}
            selectItem={setItems}
            selected={selected}
          />
        ))}
      </Slider>
    </div>
  );
};

SliderSelection.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired
};

export default SliderSelection;
