"use client";
import Slider, { Settings } from "react-slick";
import useCustomSliderController from "./comp-controller";
import "./comp.css";

interface CustomSliderProps extends Settings {
  itemsLength: number;
  children: React.ReactNode;
  setHandlePrevClick?: React.Dispatch<React.SetStateAction<() => void>>;
  setHandleNextClick?: React.Dispatch<React.SetStateAction<() => void>>;
  setIsPrevDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNextDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  responsiveConfig?: {
    480: number;
    600: number;
    1024: number;
    any: number;
  };
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  itemsLength,
  children,
  setHandleNextClick,
  setHandlePrevClick,
  setIsNextDisable,
  setIsPrevDisable,
  responsiveConfig,
  ...rest
}) => {
  const { settings, sliderRef } = useCustomSliderController({
    itemsLength,
    setHandleNextClick,
    setHandlePrevClick,
    setIsNextDisable,
    setIsPrevDisable,
    responsiveConfig,
  });

  return (
    <div className="slider-container">
      <Slider {...settings} ref={sliderRef} {...rest}>
        {children}
      </Slider>
    </div>
  );
};

export default CustomSlider;
