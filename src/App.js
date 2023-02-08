import React from "react";

// image & style
import s from "./App.module.css";
import imgSource from "./assets/image/testImage.jpg";

const App = () => {
  return (
    <div className={s.container}>
      <img src={imgSource} />
      <div className={s.optionContainer}>
        <button>Brigtness</button>
        <button>Contrast</button>
        <button>Saturation</button>
        <button>Sepia</button>
        <button>Gray Scale</button>
        <button>Hue Rotate</button>
        <button>Blur</button>
      </div>
    </div>
  );
};

export default App;
