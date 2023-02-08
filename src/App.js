import React, { useRef, useState } from "react";

// image & style
import s from "./App.module.css";
import imgSource from "./assets/image/testImage.jpg";

// Components
import Slider from "./Slider";

// Package
import * as htmlToImage from "html-to-image";

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
  const domEl = useRef(null);
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

  const getImageFilter = () => {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  };

  const exportImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);

    // download image
    const link = document.createElement("a");
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className={s.container}>
      <img ref={domEl} src={imgSource} style={getImageFilter()} />
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
        <button className={s.exportImage} onClick={exportImage}>
          Export Image
        </button>
      </div>
    </div>
  );
};

export default App;
