import React, { useEffect, useState } from "react";

// image & style
import s from "./App.module.css";
import imgSource from "./assets/image/testImage.jpg";

// Components
import Slider from "./Slider";

const DEFAULT_OPTIONS_VALUE = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    unit: "%",
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    unit: "%",
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    unit: "%",
    range: {
      min: 0,
      max: 200,
    },
  },
  {
    name: "Gray Scale",
    property: "grayscale",
    value: 0,
    unit: "%",
    range: {
      min: 0,
      max: 100,
    },
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    unit: "%",
    range: {
      min: 0,
      max: 100,
    },
  },
  {
    name: "Hue Rotate",
    property: "hue-rotate",
    value: 0,
    unit: "deg",
    range: {
      min: 0,
      max: 360,
    },
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    unit: "px",
    range: {
      min: 0,
      max: 20,
    },
  },
];

const App = () => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS_VALUE);
  const [selectedOption, setSelectedOption] = useState("Brightness");
  const optionClick = (e) => {
    setSelectedOption(e.target.name);
  };
  const getSelectedOptionItem = () => {
    return options.find((item) => item.name === selectedOption);
  };

  const changeSlider = ({ target }) => {
    setOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.name !== selectedOption) return option;
        return { ...option, value: target.value };
      });
    });
  };

  return (
    <div className={s.container}>
      <img src={imgSource} />
      <div className={s.optionContainer}>
        {options.map((item, index) => {
          return (
            <button
              key={index}
              name={item.name}
              onClick={optionClick}
              className={
                selectedOption === item.name
                  ? `${s.optionItem} ${s.activeButton}`
                  : s.optionItem
              }
            >
              {item.name}
            </button>
          );
        })}
        <Slider
          min={getSelectedOptionItem().range.min}
          max={getSelectedOptionItem().range.max}
          value={getSelectedOptionItem().value}
          onChangeSlider={changeSlider}
        />
      </div>
    </div>
  );
};

export default App;
