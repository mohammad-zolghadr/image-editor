import React, { useRef, useState } from "react";

//Style
import s from "./App.module.css";

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
const DEFAULT_IMAGE_SIZE = { width: 500, height: 500 };

const App = () => {
  const [options, setOptions] = useState(DEFAULT_OPTIONS_VALUE);
  const [selectedOption, setSelectedOption] = useState("Brightness");
  const [imageSize, setImageSize] = useState(DEFAULT_IMAGE_SIZE);
  const [imageFitType, setImageFitType] = useState("none");
  const [imageFile, setImageFile] = useState();
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
    return filters.join(" ");
  };

  const imageSizeChanger = (e) => {
    e.target.name === "width"
      ? setImageSize({ ...imageSize, width: +e.target.value })
      : setImageSize({ ...imageSize, height: +e.target.value });
  };

  const imageFitHandler = (e) => {
    setImageFitType(e.target.value);
  };

  const chooseImageHandler = (e) => {
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setImageFile({ previewImage: objectUrl, file: e.target.files[0] });
  };

  const exportImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);

    // download image
    const link = document.createElement("a");
    link.download = `${imageFile.file.name} - Edited.png`;
    link.href = dataUrl;
    link.click();
  };

  const resetToDefatul = (e) => {
    setOptions(DEFAULT_OPTIONS_VALUE);
    setImageSize(DEFAULT_IMAGE_SIZE);
  };

  return (
    <div className={s.container}>
      {/* Setup */}
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
        <div className={s.imageSizeContainer}>
          <div>
            <label>Width</label>
            <input
              type="number"
              name="width"
              value={imageSize.width}
              onChange={imageSizeChanger}
            />
          </div>
          <div>
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={imageSize.height}
              onChange={imageSizeChanger}
            />
          </div>
        </div>
        <div className={s.imageFitContainer} onChange={imageFitHandler}>
          <div>
            <input type="radio" value="cover" name="gender" />
            <span>Cover</span>
          </div>
          <div>
            <input type="radio" value="contain" name="gender" />
            <span>Contain</span>
          </div>
          <div>
            <input type="radio" value="" name="gender" />
            <span>None</span>
          </div>
        </div>
        <button className={s.resetToDefault} onClick={resetToDefatul}>
          Reset To Default
        </button>
        <button className={s.exportImage} onClick={exportImage}>
          Export Image
        </button>
      </div>
      {/* ImageSelector and Preview */}
      <div className={s.imageChooseContainer}>
        {!imageFile ? (
          <div>
            <label htmlFor="img">Select image</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={chooseImageHandler}
            />
          </div>
        ) : (
          <div className={s.imagePreviewContainer}>
            <span
              onClick={() => {
                setImageFile();
              }}
            >
              Remove Picture
            </span>
            <img
              ref={domEl}
              src={imageFile.previewImage}
              style={{
                filter: getImageFilter(),
                width: imageSize.width,
                height: imageSize.height,
                objectFit: imageFitType,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
