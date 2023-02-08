import React, { useState } from "react";

// image & style
import s from "./App.module.css";
import imgSource from "./assets/image/testImage.jpg";

// Components
import Slider from "./Slider";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("Brightness");
  const optionClick = (e) => {
    setSelectedOption(e.target.name);
  };
  return (
    <div className={s.container}>
      <img src={imgSource} />
      <div className={s.optionContainer}>
        <button
          name="Brightness"
          onClick={optionClick}
          className={
            selectedOption === "Brightness"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Brightness
        </button>
        <button
          name="Contrast"
          onClick={optionClick}
          className={
            selectedOption === "Contrast"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Contrast
        </button>
        <button
          name="Saturation"
          onClick={optionClick}
          className={
            selectedOption === "Saturation"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Saturation
        </button>
        <button
          name="Sepia"
          onClick={optionClick}
          className={
            selectedOption === "Sepia"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Sepia
        </button>
        <button
          name="Gray Scale"
          onClick={optionClick}
          className={
            selectedOption === "Gray Scale"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Gray Scale
        </button>
        <button
          name="Hue Rotate"
          onClick={optionClick}
          className={
            selectedOption === "Hue Rotate"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Hue Rotate
        </button>
        <button
          name="Blur"
          onClick={optionClick}
          className={
            selectedOption === "Blur"
              ? `${s.optionItem} ${s.activeButton}`
              : s.optionItem
          }
        >
          Blur
        </button>
        <Slider />
      </div>
    </div>
  );
};

export default App;
