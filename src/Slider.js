import React from "react";

const Slider = ({ min, max, value, onChangeSlider }) => {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChangeSlider}
      />
    </div>
  );
};

export default Slider;
